// src/config/s3Config.js
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1',  // US East (N. Virginia)
});

const s3 = new AWS.S3();
export default s3;
