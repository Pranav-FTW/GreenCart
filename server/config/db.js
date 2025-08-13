import mongoose from "mongoose";

const connetDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/GreenCart`)
    } catch (error) {
        console.error(error.message);
    }
}

export default connetDB