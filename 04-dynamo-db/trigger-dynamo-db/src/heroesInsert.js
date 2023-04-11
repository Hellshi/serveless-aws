const { randomUUID: uuid } = require('crypto')
const AWS = require('aws-sdk')
class Handler {
    constructor({ dynamoDbSvc }) {
      this.dynamoDbSvc = dynamoDbSvc
      this.dynamoDbTable = process.env.DYNAMODB_TABLE
    }

    async insertItem(params) {
      return this.dynamoDbSvc.put(params).promise()
    }

    prepareData(data) {
      const params = {
        TableName: this.dynamoDbTable,
        Item: {
          ...data,
          id: uuid(),
          createdAt: new Date().toISOString()
        }
      }
      return params
    }

    handleSuccess(data) {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    }

    handleError(data) {
      return {
        statusCode: data.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'Couldn\'t create item!!'
      }
    }


    async main(event) {
        try {
        const data = JSON.parse(event.body)
        const dbParams = this.prepareData(data)
        await this.insertItem(dbParams)

        return this.handleSuccess(dbParams.Item)
          
        } catch(error) {

            console.log('Error***', error.stack)

            return this.handleError({ statusCode: 500 })
        }
    }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()
//Factory
const handler = new Handler({
  dynamoDbSvc: dynamoDb
})
module.exports = handler.main.bind(handler)