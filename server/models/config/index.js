import mongoose from "mongoose";
const connect = async () => {
    mongoose.connect(process.env.MONGO_URI).then(() =>{
        console.log("Mongo db connected successfully...");
    }).catch((err) => {
        console.log("Unable to connect Mongo DB..." + err);
    })
}

export default connect;