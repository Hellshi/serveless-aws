const { APIGateway } = require('aws-sdk');
const moment = require('moment/moment');
const apiGateway = new APIGateway()
const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

const usagePlans = async (event) => {
  const result = await apiGateway.getUsagePlans().promise()
  return {
    statusCode: 200,
    body: JSON.stringify(
      result,
      null,
      2
    ),
  };
};

const usage = async (event) => {
  const {
    from,
    to,
    usagePlanId,
    keyId
  } = event.queryStringParameters

  const usage = await apiGateway.getUsage({
    endDate: moment(to).format('YYY-MM-DD'),
    startDate: moment(from).format('YYY-MM-DD'),
    usagePlanId,
    keyId
  }).promise()

  console.log(usage)

  return {
    statusCode: 200,
    body: JSON.stringify(
      usage,
      null,
      2
    ),
  };
};

module.exports = {
  handler,
  getUsagePlans: usagePlans,
  getUsage: usage
}