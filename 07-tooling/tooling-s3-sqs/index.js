'use-strict'
const AWS = require('aws-sdk')

const host = process.env.LOCALSTACK_HOST || "localstack"
const s3port = process.env.S3_PORT || "4566"
const s3config = {
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(
    `http://${host}:${s3port}`
  )
}
const S3 = new AWS.S3(s3config)
module.exports.handler = async (event) => {
  const allBuckets = await S3.listBuckets().promise().catch((e) => {
    console.log(e)
  })

  console.log(allBuckets)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets
      },
      null,
      2
    ),
  };
};
