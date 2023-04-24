const { DynamoDB, Endpoint } = require('aws-sdk')

const setUpDynamoDb = () => {
  if(!process.env.IS_OFFLINE)
    return
  
  const host = process.env.LOCALSTACK_HOST
  const port = process.env.DYNAMODB_PORT

  console.log(`DynamoBoy is running local at host: ${host}, port: ${port}`)

  return new DynamoDB.DocumentClient({
    region: process.env.AWS_DEFAULT_REGION,
    /* credentials: {
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET",
    }, */
    endPoint: Endpoint(`http://${host}:${port}`)
  })
}

module.exports.handler = async (event) => {
  const dynamoDb = setUpDynamoDb()

  const heroes = await dynamoDb.scan({
    TableName: process.env.HEROES_TABLE
  }).promise()

  const skills = await dynamoDb.scan({
    TableName: process.env.SKILLS_TABLE
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        skills, 
        heroes
      },
      null,
      2
    ),
  };
};
