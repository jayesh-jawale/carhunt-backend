import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  shippinngAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "",
  },
  orderItems: [
    {
      company: { type: String, required: true },
      image: { type: String, required: true },
      name: { type: String, required: true },
      average: { type: String, required: true },
      bhp: { type: String, required: true },
      price: { type: String, required: true },
      image2: { type: String, required: true },
      description: { type: String, required: true },
      cartQuantity: { type: String, required: true },
    },
  ],
  itemsPrice: {
    type: Number,
    required: true,
    default: "",
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: "",
  },
  taxPrice: {
    type: Number,
    required: true,
    default: "",
  },
  finalTotalAmount: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
},
{
  timestamps: true,
}
);

const orderChaSchema = mongoose.model("Orders", orderSchema);
export default orderChaSchema;
