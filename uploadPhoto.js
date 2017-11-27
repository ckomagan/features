//Use this code to upload photos to AWS bucket "inplaza"
//make sure to configure AWS settings 
//1. curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
// unzip awscli-bundle.zip
// sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
// aws configure
// Enter credentials, use "us-east-1" for region

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
var file = process.argv[3];

var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;

var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
