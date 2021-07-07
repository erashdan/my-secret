const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const sessionTable = process.env.SESSION_TABLE;
const {v4: uuidv4} = require('uuid');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const item = {
        uid: uuidv4()
    }

    const params = {
        TableName: sessionTable,
        Item: item
    };

    await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(item)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
