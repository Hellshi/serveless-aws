'use strict';
const { exec } = require('child_process')
const { promisify } = require('util')
const decoratorValidator = require('./util/decoratorValidator')
const shell = promisify(exec)
const globalEnum = require('./util/globalEnum')
const Joi = require('@hapi/joi')
const axios = require('axios')
const { promises: { writeFile } } = require('fs');
class Handler {
  constructor() {}

  static validator() {
    return Joi.object({
      image: Joi.string().uri().required(),
      topText: Joi.string().max(200).required(),
      bottomText: Joi.string().max(200).optional()
    })
  }

  static generateImagePath() {
    const isLocal = process.env.IS_LOCAL
    return `/tmp/${new Date().getTime()}-out.png`
  }

  static async saveImageLocally(imageUrl, imagePath) {
    const { data } = await axios.get(imageUrl, { responseType: 'arrayBuffer' })
    const buffer = Buffer.from(data, 'base64')
    return writeFile(imagePath, buffer)
  }

  static generateIdentifyCommand(imagePath) {
    const value = `
    gm identify \
    -verbose \
    ${imagePath}`
    const cmd = value.split('\n').join(' ')
    return cmd
  }

  static async getImageSize(imagePath) {
    const command = Handler.generateIdentifyCommand(imagePath)
    const { stdout } = await shell(command)
    console.log(stdout.on('error', () => {
      console.log(error)
    }), stdout)
  }

  static async main(event) {
    const options = event.queryStringParameters
    console.log('Downloading image . . .')
    const imagePath = Handler.generateImagePath()
    console.log(options.image)
    await Handler.saveImageLocally(options.image, imagePath)

    console.log('Getting image size . . .')
    await Handler.getImageSize(imagePath)

    try {
      return {
        statusCode: 200,
        body: response.stdout
      }
    } catch(error) {
      return {
        statusCode: 500,
        body: error.stack
      }
    }
  }
}

module.exports = { mememaker: 
      decoratorValidator(
        Handler.main, 
        Handler.validator(), 
        globalEnum.ARG_TYPE.QUERYSTRING
    )}