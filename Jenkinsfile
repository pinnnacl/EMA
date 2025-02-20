pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '010438482119.dkr.ecr.us-east-1.amazonaws.com'
        FRONTEND_IMAGE = "${ECR_REGISTRY}/ema-frontend:latest"
        BACKEND_IMAGE = "${ECR_REGISTRY}/ema-backend:latest"
        DB_IMAGE = "${ECR_REGISTRY}/ema-db:latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                script {
                    git credentialsId: 'github-credentials', url: 'https://github.com/git-hub-sachin/EMA.git', branch: 'simple-ema'
                }
            }
        }

        stage('Login to ECR') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'aws-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                        sh """
                        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                        aws configure set region $AWS_REGION
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
                        """
                    }
                }
            }
        }

        stage('Delete Old Images from ECR and Machine') {
            steps {
                script {
                    // Delete images from ECR
                    sh "aws ecr batch-delete-image --repository-name ema-frontend --image-ids imageTag=latest || true"
                    sh "aws ecr batch-delete-image --repository-name ema-backend --image-ids imageTag=latest || true"
                    sh "aws ecr batch-delete-image --repository-name ema-db --image-ids imageTag=latest || true"

                    // Delete images from the local machine
                    sh "docker rmi -f $FRONTEND_IMAGE || true"
                    sh "docker rmi -f $BACKEND_IMAGE || true"
                    sh "docker rmi -f $DB_IMAGE || true"

                    // Clean up dangling images
                    sh "docker image prune -f || true"
                }
            }
        }

        stage('Build and Push New Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        script {
                            sh """
                            cd frontend/
                            docker build -t ema-frontend .
                            docker tag ema-frontend:latest $FRONTEND_IMAGE
                            docker push $FRONTEND_IMAGE
                            cd ..
                            """
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        script {
                            sh """
                            cd backend/
                            docker build -t ema-backend .
                            docker tag ema-backend:latest $BACKEND_IMAGE
                            docker push $BACKEND_IMAGE
                            cd ..
                            """
                        }
                    }
                }
                stage('Build Database') {
                    steps {
                        script {
                            sh """
                            cd mysql/
                            docker build -t ema-db .
                            docker tag ema-db:latest $DB_IMAGE
                            docker push $DB_IMAGE
                            cd ..
                            """
                        }
                    }
                }
            }
        }

        stage('Run Docker Containers') {
            steps {
                script {
                    sh """
                    docker stop frontend backend mydb || true
                    docker rm frontend backend mydb || true
                    docker network create myapp
                    docker run -d --name mydb --network myapp $DB_IMAGE
                    docker run -d --name backend --network myapp $BACKEND_IMAGE
                    docker run -d --name frontend --network myapp $FRONTEND_IMAGE
                    """
                }
            }
        }

    }

}
