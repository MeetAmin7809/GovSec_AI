const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    phonenumber:{
        type:Number,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['citizen','gov'],
        default:'citizen'
    }
})

modules.exports = mongoose.model('User',userSchema)