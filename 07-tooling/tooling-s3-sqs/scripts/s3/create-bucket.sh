BUCKET_NAME=$1
awslocal \
    s3api create-bucket --bucket $BUCKET_NAME

awslocal \
    s3api list-buckets