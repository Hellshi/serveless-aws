const dynamose = require('dynamoose')

function setUpDynamoDBClient() {
    if(!process.env.IS_LOCAL)
        return
    
    const host = process.env.LOCALSTACK_HOST
    const port = process.env.DYNAMODB_PORT

    console.log('Dynamo boy is up locally', host, port)
    dynamose.local(`http://${host}:${port}`)
}

module.exports = setUpDynamoDBClient