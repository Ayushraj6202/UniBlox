import mongoose from "mongoose";
const url = `${process.env.MONGO_DB_URL}/${process.env.DATABASE}`;
const connectDB = async ()=>{
    try {
        await mongoose.connect(url);
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection error ",error);
    }
}
export default connectDB;