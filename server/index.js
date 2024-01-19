import express from "express";
import colors from "colors";
import { config } from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
//rest api
config();

connectDB();
//rest object
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/vi/auth", authRoute);

//rest api
app.get("/", (req, res) => {
  res.send({ msg: "welcome dshfie ewjr" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgCyan.white);
});

//morgan detects api req and  which api is hit
//nodemon restarts the server on port whenever changes are made