async function handler(event, context) {
    console.log('Event...', JSON.stringify(event, null, 2))
    return {
        lotr: "Yes you've got it right"
    }
}

module.exports = {
    handler
}