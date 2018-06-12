const AWS = require("aws-sdk");
const moment = require("moment");

const dynamodb = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'local'
});

var token = undefined;
getToken = async () => {
    if ( token ) return token;
    const records = await dynamodb.query({
        TableName: "ApiAccessToken",
        ExpressionAttributeValues: {
            ":id" : {
                S: "1446289"
            }
        },
        // FilterExpression: "apiName = :apiName",
        KeyConditionExpression: "clientId = :id",
    }).promise();
    for ( let item of records.Items ) {
        moment(records.Items[item].exiresAt).toDate()
        try {
            console.log(moment("afadfsasdfas"));
        } catch ( error ) {
            console.log()
        }

    }
}
function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

const PromisePool = require('es6-promise-pool');
var count = 0;

let www = async () => {
    await delay(1000);
}
let worker = () => {
    if ( count++ < 5 ) {
        console.log('----',count);
        return www()
    }
    console.log("----");
    return null;
}

let pool = new PromisePool(worker,3);

pool.start().then(() => {
    console.log("Done");
})
