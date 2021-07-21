const MSGS = require('../messages')
const slugfy = require('../service/slugfy')
const AWS = require('aws-sdk');
const fs = require('fs');

module.exports = async function (req, res, next) {
    try {
        const BUCKET_NAME = process.env.S3_BUCKET_NAME
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey
        });
        if (req.files) {
            req.body = JSON.parse(JSON.stringify(req.body));
            console.log(req.body)
            let doc = req.files.doc
            const name = slugfy(doc.name)
            req.body.doc_name = name

            const file = await doc.mv(`./uploads/${name}`)
            const params = {
                Bucket: BUCKET_NAME,
                ACL: 'public-read',
                Key: `data/${name}`, // File name you want to save as in S3
                Body: fs.createReadStream(`./uploads/${name}`)
            };
            s3.upload(params, function (err, data) {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                } else {
                    console.log(`File uploaded successfully. ${data.Location}`);
                    req.body.file_url = data.Location
                    fs.unlinkSync(`./uploads/${name}`)
                    next()
                }
            })

        }
        else{
            res.status(500).send( {"error" : "sem files"})
        }

    } catch (err) {
        res.status(500).send({ "error": err.message })
    }
}
