const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes');

const SERVER_PORT = 3000;

const app = express();

app.use(express.json()); // Make sure it comes back as json

const DB_CONNECTION_STRING = 'mongodb+srv://dbrootadmin:dbpassword@cluster0.o0ag19w.mongodb.net/db_f2021_comp3123?retryWrites=true&w=majority';

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log(`MongoDB succesfully connected`);
}).catch(err => {
    console.log(`Error while MongoDB connection ${err}`);
});

app.use("/", restaurantRouter);

app.listen(SERVER_PORT, () => { 
    console.log(`Server is running at http://localhost:${SERVER_PORT}/`) 
});