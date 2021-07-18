const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;
const cuid = require('cuid');
const {toLowerCase} = require('/opt/utils');
const responseObject = require('/opt/response')
const ValidationException = require('/opt/ValidationException')

exports.handler = async (event) => {
    let response = {}
    Object.assign(response, responseObject)

    try {
        event.headers = toLowerCase(event.headers)

        let body = JSON.parse(event.body)

        if (!body || !body.body) {
            let exception = new ValidationException()
            exception.setMessage('The body is required')
            throw exception
        }

        const item = {
            uri: cuid(),
            body: body.body
        }

        await docClient.put({
            TableName: secretTable,
            Item: item
        }).promise();

        response.setStatusCode(201)
        return response.handle(item)
    } catch (exception) {
        return response.handleException(exception)
    }
}
