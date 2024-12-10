FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_DATABASE employees_db
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=employees_db
ENV MYSQL_USER=archit
ENV MYSQL_PASSWORD=Password1!

# Copy the SQL scripts to the Docker entrypoint directory
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306
