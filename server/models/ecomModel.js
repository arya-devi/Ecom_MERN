const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const userSchema = new mongoose.Schema({
   
    no:{
        type:Number,
    },
    name:{
        type:String,
        required:[true,'Name is required'],
        maxlength: [500, 'Name cannot exceed 500 characters']
    },
    price:{
        type:Number,
        required:[true,'price is required'],
        min: [0, 'Price cannot be negative']    
    },
    description:{
        type:String,
        required:[true,'description is required'],
    },
    image:{
        type:String,
        required:[true,'image is required'],
    }
})
userSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product',userSchema)
module.exports =Product