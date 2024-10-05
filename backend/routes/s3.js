import express from 'express';
import AWS from 'aws-sdk';

const router = express.Router();
const S3_BUCKET = "kairoticmfiles"
const REGION = 'us-east-1';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: REGION
});

const s3 = new AWS.S3();

router.get('/generate-presigned-url', (req, res) => {
  const { fileName, fileType } = req.query;

  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60, // URL expiration time in seconds
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ url });
  });
});

export default router;