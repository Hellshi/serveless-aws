# 1 - Criar o arquivo de segurança
# 2 - criar a role de segurança com o IAM

aws iam create-role \
    --role-name lambda-exemplo \
    --assume-role-policy-document file://politicas.json \
    | tee logs/role.log

# 3 Criar um arquivo com o conteúdo e zipa-lo
zip function.zip index.js

#4 Suba a função para a AWS
aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs18.x \
    --role "Add the arn generated in role.log in step 3" \
    | tee logs/lambda-create.log

#5 Invoke Lambda!
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log

#everytime your file changes repeat step 3 and then:
aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log

#remover
aws lambda delete-function \
    --function-name hello-cli 

aws iam delete-role \
    --role-name lambda-exemplo