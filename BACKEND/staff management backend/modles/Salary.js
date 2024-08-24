const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:Date.now
    },
    basic:{
        type:Number,
        required:true
    },
    othrs:{
        type:Number,
        required:true
    },
    otrate:{
        type:Number,
        required:true
    },
    
    bonus:{
        type:Number,
        required:true
    },
    totalSalary:{
        type:Number,
        required:true
    }
    
    

})

const Salary = mongoose.model("Salary",salarySchema);

module.exports = Salary;