module.exports.public = async (event) => {
    console.log('Public route', new Date().toISOString())

    return {
      statusCode: 200,
      body: JSON.stringify(
        [
            {
                id: 2,
                name: "???",
                power: "????????"
            }
        ],
        null,
        2
      ),
    };
  };
  
  module.exports.private = async (event) => {
    console.log('Private route', new Date().toISOString())

    console.log({
      'User': JSON.parse(
        event.requestContext.authorizer.user
      )
    })
    return {
      statusCode: 200,
      body: JSON.stringify(
        [
            {
                id: 2,
                name: "Prive bb",
                power: "rs"
            }
        ],
        null,
        2
      ),
    };
  };
  