BUCKET_NAME=$1
FILE_PATH=$2

awslocal \
    s3 cp $FILE_PATH s3://$BUCKET_NAME

awslocal \
    s3 ls s3://$BUCKET_NAME