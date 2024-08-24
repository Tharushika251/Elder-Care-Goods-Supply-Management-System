const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const staffloginSchema = new Schema({
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    
})

const Stafflogin = mongoose.model("Stafflogin",staffloginSchema);

module.exports = Stafflogin;