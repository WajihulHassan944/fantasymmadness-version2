// src/config/s3Config.js
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',  // US East (N. Virginia)
});
console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID); // For debugging only

const s3 = new AWS.S3();
export default s3;
