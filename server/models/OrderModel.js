import mongoose from "mongoose";
const {
  Schema: {
    Types: { ObjectId: id },
  },
} = mongoose;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: id,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: id,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "delievered", "cancel"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
