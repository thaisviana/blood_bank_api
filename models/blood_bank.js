const mongoose = require('mongoose');

const BloodBankSchema = new mongoose.Schema({
    file_url : {
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    country : {
      type : String,
      required : true
    },
    location : {
      type : String,
      required : false
    },
    first_date: {
        type: Date,
        required : false
    },
    last_date: {
        type: Date,
        required : false
    }, 
    donation_campaign  : [
        {
            first_date: {
                type: Date,
                required : false
            },
            last_date: {
                type: Date,
                required : false
            }, 
        }
    ],

}, { autoCreate : true })
BloodBankSchema.index({'$**': 'text'});
module.exports = mongoose.model('blood_bank', BloodBankSchema);