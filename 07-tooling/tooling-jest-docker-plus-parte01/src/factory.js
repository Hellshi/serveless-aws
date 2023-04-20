const AWS = require('aws-sdk')
const s3config = {
  s3ForcePathStyle: true
}
const isLocal = process.env.IS_OFFLINE


if(isLocal) {
  // This is unnecessary when the variables are set from docker-compose file
  /* AWS.config.update({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  }) */

  const host = process.env.LOCALSTACK_HOST || "localhost"
  s3config.endpoint = new AWS.Endpoint(
    `http://${host}:4566`
  )
}

const S3 = new AWS.S3(s3config)

module.exports = {
  S3
}
