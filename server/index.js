import express  from "express";
import "dotenv/config";
import cors  from "cors";
import connect from "./models/config/index.js";
import routes from "./routes/index.js";

const app = express();
connect();
app.use(express.json());

app.use("/api/v1", routes);


app.listen(process.env.PORT, ()=>{
    console.log("Servr listening on PORT : " + process.env.PORT)
})