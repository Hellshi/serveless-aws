# required variables
CLUSTER_NAME=
USERNAME=
PASSWORD=
DB_NAME=
SECRET_NAME=
RESOURCE_ARN=
SECRET_ARN=
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

while [ $STATUS==$CREATING ]
do
    STATUS=$(aws rds describe-db-clusters \
        --db-cluster-identifier $CLUSTER_NAME \
        --query 'DBClusters[0].Status' \
        | tee rds-status.txt
    )
    echo $STATUS
    sleep 1
done