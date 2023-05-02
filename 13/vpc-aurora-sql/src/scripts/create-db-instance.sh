# required variables
CLUSTER_NAME=cluster-updated-version
DB_NAME=heroes
USERNAME=hellshi

PASSWORD=
SECRET_NAME=
RESOURCE_ARN=
SECRET_ARN=

# Create database
#I've tried to update engine-version. However it did not went rigth 
aws rds create-db-cluster \
    --engine-version 5.6.10a \
    --db-cluster-identifier $CLUSTER_NAME \
    --engine-mode serverless \
    --engine aurora \
    --master-username $USERNAME \
    --master-user-password $PASSWORD \
    --scaling-configuration MinCapacity=2,MaxCapacity=4,AutoPause=false,TimeoutAction=ForceApplyCapacityChange \
    --enable-http-endpoint \
    --region us-east-1 \
    | tee rds-cluster.txt

CREATING="creating"
STATUS=$CREATING

#This does not work due "==".
# OS: Linux Ubuntu 20.04.06 running in wsl 1.2.5.0
while [ $STATUS == $CREATING ]
do
    STATUS=$(aws rds describe-db-clusters \
        --db-cluster-identifier $CLUSTER_NAME \
        --query 'DBClusters[0].Status' \
        | tee rds-status.txt
    )
    echo $STATUS
    sleep 1
done

aws secretsmanager create-secret \
    --name $SECRET_NAME \
    --description "Credentials for aurora serverless db" \
    --secret-string '{"username": "'$USERNAME'", "password": "'$PASSWORD'"}' \
    --region us-east-1 \
    | tee rds-secret.txt

aws rds-data execute-statement \
    --resource-arn $RESOURCE_ARN \
    --secret-arn $SECRET_ARN \
    --database mysql \
    --sql "show databases;" \
    --region us-east-1 \
    | tee cmd-show-dbs.txt

aws rds-data execute-statement \
    --resource-arn $RESOURCE_ARN \
    --secret-arn $SECRET_ARN \
    --database mysql \
    --sql "CREATE DATABASE $DB_NAME;" \
    --region us-east-1 \
    | tee cmd-create-db.txt

aws rds describe-db-subnet-groups \
    | tee rds-db-subnets.txt

aws secretsmanager delete-secret \
    --secret-id $SECRET_NAME \
    | tee secret-delete.txt

aws rds delete-db-cluster \
    --db-cluster-identifier $CLUSTER_NAME \
    --skip-final-snapshot \
    | tee rds-delete.cluster.txt