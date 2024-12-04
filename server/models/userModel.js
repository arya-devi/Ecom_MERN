const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email must be required'],
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:[true,'password must be required'],
        minlength:[6,'Password must contain atleast 6 characters']
    },
    isAdmin: {
        type: Boolean,
        default: false,
      }
})
const User = mongoose.model('User',userSchema)
module.exports = User