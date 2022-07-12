const mongoose = require('mongoose');
require('dotenv').config();

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGO_CREDENTIALS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () =>{
    console.log('Connected to MongoDB')
})

// Export connection 
module.exports = mongoose.connection;
