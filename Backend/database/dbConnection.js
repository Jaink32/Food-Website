import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RESTAURANT"
    }).then(() => {
        console.log("Connected to Databse Succesfully");
    }).catch(err => {
        console.log(`Some Error occured while connectiing the database ${err}`)
    })
}
export default dbConnection