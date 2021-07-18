const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;
const responseObject = require('/opt/response')
const SecretNotFound = require('/opt/SecretNotFound')
const SecretLocked = require('/opt/SecretLocked')

exports.handler = async (event) => {
    let response = {}

    Object.assign(response, responseObject)

    try {
        const tableQuery = {
            TableName: secretTable,
            Key: {uri: event.pathParameters.secret}
        };

        const data = await docClient.get(tableQuery).promise();

        if (!data.Item) {
            throw new SecretNotFound()
        }

        const item = data.Item;

        if (item.body === '') {
            throw new SecretLocked()
        }

        return response.handle({
            body: item.body
        })
    } catch (exception) {
        return response.handleException(exception)
    }
}
