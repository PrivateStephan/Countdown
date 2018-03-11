//schema builder
var mongoose = require('mongoose');

//Student schema
var StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true
    }
});

var Student = mongoose.model('Student', StudentSchema);
module.exports = Student;