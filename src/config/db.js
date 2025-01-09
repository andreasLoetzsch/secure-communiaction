const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        mongoose.connect(process.env.DB_CONNECTION_KEY)
        console.log('mongodb connected')
    }catch{
        console.error('Error connecting to mongodb', error.message)
    }
    
}

module.exports = connectDB