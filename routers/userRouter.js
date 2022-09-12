import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { insertUser, getUserByEmail, getUsers } from "../models/userModel.js";

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
  if(!userFromDb) {
   return res.status(401).send({ message: "Invalid Credentials" });
  }

  const storedPassword = userFromDb.password;
  const comparePass = await bcrypt.compare(password, storedPassword);
  if (comparePass) {
    const token = jwt.sign({id : userFromDb._id}, process.env.SECRET_KEY)
    res.json({ status: "success", message: "Successfull login", name: userFromDb.name, token: token });
  } else {
    res.status(401).send({ message: "Invalid Credentials" });
    return;
  }
});

// Get Users
router.get("/get-users", async(req, res) => {
    const getUser = await getUsers();
    res.send(getUser);
  })

export const userRouter = router;
