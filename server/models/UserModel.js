import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("users", UserSchema);

export default UserModel;
