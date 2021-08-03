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
    author_name:{
        type : String,
        required : true
    },
    author_email:{
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
    official_request: {
        type: Boolean,
        required : false
    },
    approved_status: {
        type: Boolean,
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
    holidays  : [
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
    forecast_files: [
        {
            name : {
                type : String,
                required : false
            },
            file_url : {
                type : String,
                required : true
            }
        }
    ]

}, { autoCreate : true })
BloodBankSchema.index({'$**': 'text'});
module.exports = mongoose.model('blood_bank', BloodBankSchema);