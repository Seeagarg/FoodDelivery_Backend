const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://GoFood:mern1234@cluster0.outjrma.mongodb.net/GoFoodMern?retryWrites=true&w=majority'
const ConnectToMongoose=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Connected To The Database.");
            const res = mongoose.connection.db.collection("Food_items");
            res.find({}).toArray(function(err,data){
                const foodCategory = mongoose.connection.db.collection("Food_Category");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err){
                        console.log(err);
                    }
                    else{
                        global.FoodCategory = catData;
                        global.food_items = data;
                    }
        
                })

                // if(err){
                //     console.log(err);
                // }
                // else{
                //     global.food_items = data;
                // }

            });
        }
        
    })
    
}

module.exports = ConnectToMongoose;

