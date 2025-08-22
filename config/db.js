const mongoose = require('mongoose');

const connectDB= async()=>{
  try{
    await mongoose.connect('mongodb://localhost:27017/filter');
    console.log('Mongoose connected');

  }catch(err){
    console.error('MongoDB Connection Failed', err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
