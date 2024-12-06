//here we will wrute the logic using which we vcan connect with database

import mongoose from "mongoose";


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://RaniaIjaz:wXvD4hu43MSm2zDH@cluster0.j2ra7.mongodb.net/?")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default connectDB
