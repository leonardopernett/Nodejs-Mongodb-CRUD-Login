const mongoose = require('mongoose');
const {db} = require('./config/config');

const config = {
    useUnifiedTopology: true ,
    useNewUrlParser: true  
}

async function connection(){
    await mongoose.connect(db, config);
    console.log('database is connected');
}

module.exports = connection

