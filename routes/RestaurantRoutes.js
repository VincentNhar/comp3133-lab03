const express = require('express');
const restaurantModel = require('../models/Restaurant');
const router = express.Router();

//  returns restaurants details
router.get('/restaurants', async (req,res) => {
    console.log('Fetching restaurant list')
    try{
        const { sortBy } = req.query;

        if (sortBy){
            // returns retaurant details[_id, cuisine, name, city, restaurant_id] sorted by restaurant_id
            // http://localhost:8081/restaurants?sortBy=ASC
            // http://localhost:8081/restaurants?sortBy=DESC

            if (sortBy.toUpperCase() == 'ASC' || sortBy.toUpperCase() == 'DESC'){
                const sortMethod = (sortBy.toUpperCase() == 'ASC') ? 1 : -1;

                const restaurantList = await restaurantModel
                                    .find({})
                                    .select("_id cuisine name city restaurant_id")
                                    .sort({'restaurant_id': sortMethod});

                res.status(200).send(restaurantList);
            }
            else{
                res.status(500)
                        .send("Sort by Ascending: sortBy=ASC\nSort by Descending: sortBy=DESC")
            }
        }else{
            // return all restaurants details (if sortby query isnt provided)
            //  http://localhost:8081/restaurants
            const restaurantList = await restaurantModel.find({});

            if(restaurantList) {
                res.status(200).send(restaurantList)
            }else{
                res.status(404).send("Restaurant API not found")
            }
        } 
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }

});

//  return all restaurant by cuisine
//  http://localhost:8081/restaurants/cuisine/:cuisine
router.get('/restaurants/cuisine/:cuisine', async (req,res) => {
    
    try{
        const { cuisine } = req.params

        console.log(`\nFetching restaurant list with ${cuisine} cuisine`)

        const restaurantList = await restaurantModel.find({}).where({cuisine: [cuisine]});

        console.log(`\n${restaurantList.length} restaurant/s were fetch with ${cuisine} cuisine `)

        if(restaurantList) {
            res.status(200).send(restaurantList)
        }else{
            res.status(404).send("Restaurant API not found")
        }

    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }

});


// return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
router.get('/restaurants/Delicatessen', async (req,res) => {
    try{
        console.log("Fetching restaurants by cuisine Delicatessen excluding in Brooklyn city")
        const restaurantList = await restaurantModel
                                    .find({})
                                    .select("cuisine name city")
                                    .sort({"name": 1})
                                    .where("city").ne("Brooklyn")

        if (restaurantList) {
            res.status(200).send(restaurantList)
        }else{
            console.log("Restaurant list not found")
            res.status(404).send("restaurant list not found")
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});

module.exports = router