'use strict'
const AWS = require("aws-sdk");
exports.handler = (event,context,callback) => {
    context.succeed("haha11");
    callback(null,"Hello world!");
};


let dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    endpoint: 'http://localhost:8000',
    region: 'local'
});

let jj = async () => {
    let data = await dynamodb.query({
        TableName: "ApiAccessToken",
        ExpressionAttributeValues: {
            // ":apiName": {
            //     S: "Pinterest"
            // },
            ":id" : {
                S: "1446289"
            }
        },
        // FilterExpression: "apiName = :apiName",
        KeyConditionExpression: "clientId = :id",
    }).promise();
    console.log(JSON.stringify(data.Items[0].token.S));
};


jj();
