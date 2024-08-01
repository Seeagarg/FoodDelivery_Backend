const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()

router.get('/foodData',(req,res)=>{
    try{

        const result = mongoose.connection.db.collection("Food_items");
            result.find({}).toArray(function(err,data){
                const foodCategory = mongoose.connection.db.collection("Food_Category");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(data)
                        console.log(catData)
                        res.send([data,catData])
                        
                        // global.FoodCategory = catData;
                        // global.food_items = data;
                    }
        
                })

            })



        // console.log(global.food_items)
        // console.log(global.FoodCategory)
        // res.send([global.food_items,global.FoodCategory])

    }catch(error){
        console.error(error.message);
        res.send("server Error");
    }
})


module.exports = router;