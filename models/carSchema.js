import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carSchema = new Schema({
    company: {
        type: String,
        required: true,
        default: "",
      },
      image: {
        type: String,
        required: true,
        default: "",
      },
      name: {
        type: String,
        required: true,
        default: "",
      },
      average: {
        type: String,
        required: true,
        default: "",
      },
      bhp: {
        type: String,
        required: true,
        default: "",
      },
      price: {
        type: String,
        required: true,
        default: "",
      },
      image2: {
        type: String,
        required: true,
        default: "",
      },
      description: {
        type: String,
        required: true,
        default: "",
      }
});

const carChaSchema = mongoose.model("Cars", carSchema);
export default carChaSchema
