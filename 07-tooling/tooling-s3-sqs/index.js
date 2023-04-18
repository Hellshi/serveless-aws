module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Yoaaa'
      },
      null,
      2
    ),
  };
};
