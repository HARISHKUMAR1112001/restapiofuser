const mongoose = require('mongoose');

//connection with MongoDBCompass
mongoose.connect('mongodb://localhost:27017/usercrude', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })