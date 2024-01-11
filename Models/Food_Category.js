const mongoose = require('mongoose')

const {Schema} = mongoose;

const foodCategorySchema = new Schema({
    CategoryName:{
        type:String,
        required:true,
        // unique:true
    },
})

module.exports = mongoose.model('Food_Category',foodCategorySchema)