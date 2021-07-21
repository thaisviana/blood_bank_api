const express = require('express')
const get_dates = require('../../service/get_dates')
const router = express.Router();
const file = require('../../middleaware/file')
const BloodBank = require('../../models/blood_bank')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })



// @route    POST /uploads
// @desc     
// @access   Public
router.post('/', upload.single('doc'),  file,  async (req, res, next) => {
    try {
      const result = await get_dates(req.body.Location)
      req.body.first_date = result[0]
      req.body.last_date = result[1]
      res.json(req.body)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": 'Erro!' })
    }
  })
  


module.exports = router;