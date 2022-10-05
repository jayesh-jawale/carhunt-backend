import jwt from "jsonwebtoken";
import userChaSchema from "../models/userSchema.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userChaSchema.findById(verifyUser._id);

    // const user = await userChaSchema.findOne({ _id: verifyUser._id });
    // return res.send(user);

    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export { authMiddleware };
