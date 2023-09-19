const AWS = require('aws-sdk');

// In order to perform AWS operations using the aws-sdk library,
// we need to actually "log in" to AWS through an IAM user
// This would require you to create an IAM user with the appropriate permissions
// for using DynamoDB, and you would need to generate an access key to use to log into that user
// from here

// As previously mentioned a few days ago, aws-sdk will automatically look
// for the access key and secret access key from the following 2 environment variables
// 1. AWS_ACCESS_KEY_ID=<access key value>
// 2. AWS_SECRET_ACCESS_KEY=<secret access key>
// It will use the values of those two environment variables to log in as the IAM user

// You should also set the AWS_DEFAULT_REGION environment variable to the AWS region you are using

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();


function getItem(grocery_item_id) {
    const params = {
        TableName: 'grocery',
        Key: {
            grocery_item_id

        }
    }

    return docClient.get(params).promise();
}

function postItem(grocery_item_id, name, quantity, price) {

    const params = {
        TableName: 'grocery',
        Item: {
            grocery_item_id,
            name,
            quantity,
            price
        }
    }

    return docClient.put(params).promise();
};
function putItem(grocery_item_id, newName) {
    const params = {
        TableName: 'grocery',
        Key: {
            grocery_item_id
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'name'
        },
        ExpressionAttributeValues: {
            ':value': newName
        }
    }

    return docClient.update(params).promise();
}
function deleteItem(grocery_item_id) {
    const params = {
        TableName: 'grocery',
        Key: {
            grocery_item_id
        }
    }

    return docClient.delete(params).promise();
}





















module.exports = {
    getItem,
    postItem,
    putItem,
    deleteItem
};