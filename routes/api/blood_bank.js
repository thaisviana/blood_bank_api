const express = require('express')
const router = express.Router();
const BloodBank = require('../../models/blood_bank')


// @route    GET /blood_bank
// @desc     LIST blood banks
// @access   Public
router.get('/', async (req, res, next) => {
    try {
        const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
        const blood_banks = await BloodBank.find()
        for (let b of blood_banks){
          let name = `forecast_${getLastItem(b.file_url)}`
          b.forecast_files = [{name: name, file_url : `${process.env.BUCKET_PUBLIC_PATH}forecast/${name}` }]
        }
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