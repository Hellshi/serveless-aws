'use-strict';
const { promises: { readFile } } = require('fs');
const { Rekognition, Translate } = require('aws-sdk');

class Handler {
  constructor({ rekoSvc, translator }) {
    this.rekoSvc = rekoSvc
    this.translator = translator
  }
  async detectImagesLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise()

    console.log(result)

    const workingItems = result.Labels
      .filter(({ Confidence }) => Confidence > 80)

    const names = workingItems
      .map(({ Name }) => Name)
      .join(' and ')

    return { names, workingItems }
  }

  async translateText(text) {
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text
    }

    const { TranslatedText } = await this.translator
                              .translateText(params)
                              .promise()
    return TranslatedText.split(' e ')
  }

  formatTextResults(texts, workingItems) {
    
    const finalText = []
    for(const indexText in texts) {
      const nameInPortuguese = texts[indexText]
      const confidence = workingItems[indexText].Confidence;
      finalText.push(
        ` ${confidence.toFixed(2)}% de ser do tipo ${nameInPortuguese}`

      )
    }
    return finalText.join('\n')
  }

  async main() {
    try {
      const imgBuffer = await readFile('./images/cat.jpg')
      console.log('Detecting Labels...')
      const { names, workingItems } = await this.detectImagesLabels(imgBuffer)

      console.log('Translating text...')
      const text = await this.translateText(names)

      console.log('Handling final Object....')
      const finalText = this.formatTextResults(text, workingItems)
      return {
        statusCode: 200,
        body: `A imagem tem\n `.concat(finalText)
      }
    } catch(error) {
      console.log('Error***', error.stack)
      return {
        statusCode: 500,
        body: 'Internal Server Error'
      }
    }
  }
}
const reko = new Rekognition()
const translator = new Translate()
const handler = new Handler({
  rekoSvc: reko,
  translator
})

module.exports.main = handler.main.bind(handler)