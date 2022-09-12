import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "",
      },
      email: {
        type: String,
        required: true,
        default: "",
      },
      password: {
        type: String,
        required: true,
        default: "",
      },

});

const userChaSchema = mongoose.model("User", userSchema);
export default userChaSchema
