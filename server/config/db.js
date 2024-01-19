import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `connected to mongodb database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (err) {
    console.log(`Error is mongodb ${err}`.bgRed.white);
  }
};

export default connectDB;
