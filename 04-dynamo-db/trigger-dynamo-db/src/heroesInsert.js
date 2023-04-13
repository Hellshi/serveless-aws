const { v4: uuid } = require('uuid')
const Joi = require('@hapi/joi')
const AWS = require('aws-sdk')
const decoratorValidator = require('./util/decoratorValidator')
class Handler {
    constructor({ dynamoDbSvc }) {
      this.dynamoDbSvc = dynamoDbSvc
      this.dynamoDbTable = process.env.DYNAMODB_TABLE
    }

    async insertItem(params) {
      return this.dynamoDbSvc.put(params).promise()
    }

    static validator() {
      return Joi.object({
          nome: Joi.string().max(100).min(2).required(),
          poder: Joi.string().max(20).required()
      })
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
        const data = event.body
        const dbParams = this.prepareData(data)
        await this.insertItem(dbParams)

        return this.handleSuccess(dbParams.Item)
          
        } catch(error) {
            console.log('Error***', error)

            return this.handleError({ statusCode: 500 })
        }
    }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()
//Factory
const handler = new Handler({
  dynamoDbSvc: dynamoDb
})
module.exports =  decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  'body'
) 