const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactno:{
        type:String,
        required:true
    },
    NIC:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    workexperience:{
        type:String,
        required:true
    },
    qulification:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
       
    },
    

})

const Staff = mongoose.model("Staff",staffSchema);

module.exports = Staff;