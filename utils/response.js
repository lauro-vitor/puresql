const response =  (error, data, message) => {
    
    return {
        error,
        data,
        messages: [message]
    }
}
module.exports = response;