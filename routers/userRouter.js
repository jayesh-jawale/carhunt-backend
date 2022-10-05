import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authMiddleware } from "../middlewares/auth_middleware.js";
import userChaSchema from "../models/userSchema.js";

import {
  insertUser,
  getUserByEmail,
  getUsers,
  getUserProfile,
  createToken,
} from "../models/userModel.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  // res.send("Message from ticket Router");
  next();
});

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  const bodyData = {
    name,
    email,
    password: hashPassword,
  };

  const userFromDB = await getUserByEmail(email);

  if (userFromDB) {
    res.json({ status: "error", message: "email already exists" });
  } else {
    const result = await insertUser(bodyData);
    res.json({ status: "success", message: "user created", result });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userFromDb = await getUserByEmail(email);
  if (!userFromDb) {
    return res.status(401).send({ message: "Invalid Credentials" });
  }

  const storedPassword = userFromDb.password;
  const comparePass = await bcrypt.compare(password, storedPassword);
  if (comparePass) {
    const accessJWT = await createToken(userFromDb._id);

    res.json({
      status: "success",
      message: "Successfull login",
      _id: userFromDb._id,
      name: userFromDb.name,
      email: userFromDb.email,
      token: accessJWT,
    });
  } else {
    res.status(401).send({ message: "Invalid Credentials" });
    return;
  }
});

// Get Users
router.get("/get-users", async (req, res) => {
  const getUser = await getUsers();
  if (getUser) {
    return res.json({
      status: "success",
      getUser,
    });
  } else {
    res.json({
      status: "error",
      message: "Cannot get tickts",
    });
  }
});

router.get("/v1/user", authMiddleware, async (req, res) => {
  // const data = await getUserProfile();
  // res.json({ userData: data });

  const user = await userChaSchema.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const userRouter = router;
