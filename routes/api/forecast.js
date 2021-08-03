const express = require('express')
const router = express.Router();


// @route    GET /forecast
// @desc     LIST forecast
// @access   Public
router.get('/', async (req, res, next) => {
    try {
        res.status(200).send({ })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": 'Erro!' })
    }
})


module.exports = router;