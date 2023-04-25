const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const myRoles = {
    // role name vs function name
    'heroes:list': 'private'
}

exports.handler = async event => {
    const token = event.authorizationToken;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )
        console.log({decodedUser})
        return null
    } catch(error) {
        console.error(error)
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Unauthorized'
            })
        }
    }
}