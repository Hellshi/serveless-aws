const privateUsers = async () => {
    // In the real world this should be a database get
    return [
        "test@test.com",
        "hell@test.com",
        "bibia@test.com",
    ]
}

exports.private = privateUsers