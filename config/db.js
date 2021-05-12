const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://azerty:azerty@oxygencharity.qa2u1.mongodb.net/test?authSource=admin&replicaSet=atlas-129g14-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("failed to connect to MongoDB", err));


