 # EMA

## k8 Debugging Method

Create a dummy pod using below command
kubectl run debug-pod --image=curlimages/curl:latest --command -- sleep infinity
kubectl exec -it  mysqldb-0 -- /bin/sh
curl http://<cluster-name>:port/path

check for the curl response

## Challeges

When deploying in kubernetes environment change the DB host name or hostIP in backend application Dockerfile as well as in /backend/db/conn.js

Also the backend URL is configured in frontend route.js which need to be edited

Also there are some unwanted newrelic configuration, find it and remove it.
