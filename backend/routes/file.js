const express = require('express');
const router = express.Router();
const upload = require('../services/file-upload');

const singleUpload = upload.single('file');

router.post('/upload', function (req, res) {
  console.log(req);
  singleUpload(req, res, function (err, some) {
    if (err) {
      console.log(err);
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}]});
    }
    return res.json({'fileUrl': req.file.location});
  });
});

module.exports = router;
