const express = require('express')
const router = express.Router();
const file = require('../../middleaware/file')
const BloodBank = require('../../models/blood_bank')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


// @route    GET /blood_bank
// @desc     LIST blood banks
// @access   Public
router.get('/', async (req, res, next) => {
    try {
        const blood_banks = await BloodBank.find()
        res.json(blood_banks)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": 'Erro!' })
    }
})


// @route    POST /blood_bank
// @desc     ADD blood_bank
// @access   Public
router.post('/', async (req, res, next) => {
    try {
      let blood_bank = new BloodBank(req.body)
      await blood_bank.save()
      if (blood_bank.id) {
          res.json(blood_bank);
      }
      else{
        res.json({ "error": 'Erro!' });
      }
  
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": 'Erro!' })
    }
  })
  


module.exports = router;