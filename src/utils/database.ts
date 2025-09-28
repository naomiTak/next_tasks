import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL || "")
    } catch (error) {
        console.log(error)
        console.log("DB connecton failed")
        throw new Error();
    }
}