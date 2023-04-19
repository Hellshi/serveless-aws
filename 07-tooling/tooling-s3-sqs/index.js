'use-strict'
const AWS = require('aws-sdk')

const host = process.env.LOCALSTACK_HOST || "localhost"
const s3port = process.env.S3_PORT || "4572"
const s3config = {
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(
    `http://localhost`
  )
}
const S3 = new AWS.S3({
  endpoint: `http://localstack:4572`
})


module.exports.handler = async (event) => {
  const allBuckets = await S3.listBuckets().promise().catch((e) => {
    console.log(S3.endpoint)
  })
  console.log(allBuckets)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets: "JSON.parse(allBuckets)"
      },
      null,
      2
    ),
  };
};
