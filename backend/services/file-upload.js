const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: "SiZZcF2PTj4+dAyQJzYnRu0Vv+5ed3zLOOSBHE6d",
  accessKeyId: "AKIAIOKF5S4AY6R23FJA",
  region: 'eu-central-1'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'allrightpractice',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      console.log(file.mimetype);
      console.log(file.type);
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;
