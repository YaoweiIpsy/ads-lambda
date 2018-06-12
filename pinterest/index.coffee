AWS = require 'aws-sdk'
#request = require 'request-promise'

dynamoDB = new AWS.DynamoDB endpoint:'http://localhost:8000',region:'local'

token = undefined
campaigns = undefined

Pinterest =
  getToken: () ->
    return token if token
    data = await (dynamoDB.query
      TableName: "ApiAccessToken"
      ExpressionAttributeValues:
        ":id": S: "1446289"
      KeyConditionExpression: "clientId = :id"
    .promise())
    return token = data.Items[0].token.S
  getCompaign: () ->
    return campaigns if campaigns
    data = dynamoDB.scan
      TableName: "PinterestCampaign"
    .promise()
    return campaigns = data.Items
  worker: () ->
#    adGroup = undefined
    while true
      return null if ( campaigns.length == 0 )
      if campaigns[-1].adGroupIds.length == 0
        campaigns.pop()
        continue
    adGroupId = campaigns[-1].adGroupIds.pop()
    dynamoDB.query
      TableName: "PinterestAdGroup"
      ExpressionAttributeValues: ":id": adGroupId
      KeyConditionExpression: "adGroupId = :id"
    .promise()
    .then (data) ->
      console.log(data)

PromisePool = require 'es6-promise-pool'

module.exports = () ->
  await Pinterest.getToken()
  await Pinterest.getCompaign()
  pool = new PromisePool(Pinterest.worker,3);

  pool.start().then ->
    console.log("Done")








