const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('./lib/util')
const myRoles = {
    // role name vs function name
    'heroes:list': 'private'
}

const authorizeUser = (userScopes, methodArn) => {
    return userScopes.find(
        scope => ~methodArn.indexOf(myRoles[scope])
    )
}

exports.handler = async event => {
    const token = event.authorizationToken;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )
        const { user } = decodedUser
        const userId = user.username
        const isAllowed = authorizeUser(
            user.scopes,
            event.methodArn
        )

        const authorizedContext = {
            user: JSON.stringify(decodedUser)
        }

        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow' : 'Deny',
            event.methodArn,
            authorizedContext
        )
        return policyDocument

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