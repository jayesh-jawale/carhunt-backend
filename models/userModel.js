import userChaSchema from "./userSchema.js";
import jwt from "jsonwebtoken";

const insertUser = (bodyData) => {
  return new Promise((resolve, reject) => {
    userChaSchema(bodyData)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    userChaSchema
      .findOne({ email })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    userChaSchema
      .find({})
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    userChaSchema
      .findOne()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const updateUserProfile = (_id, userBodyData) => {
  return new Promise((resolve, reject) => {
    try {
      userChaSchema.findOneAndUpdate({_id}, {
          $set: {data: userBodyData}
      }
  ).then((data) => resolve(data))
  }
      catch (error) {
          reject(error)
      }
  })
};

const createToken = async (_id) => {
  const accessJWT = jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  await storeTokenInDB(_id, accessJWT);
  return Promise.resolve(accessJWT);
};

const storeTokenInDB = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      userChaSchema
        .findOneAndUpdate(
          { _id },
          {
            $set: { "authToken.token": token },
          }
        )
        .then((data) => resolve(data));
    } catch (error) {
      reject(error);
    }
  });
};

export { insertUser, getUserByEmail, getUsers, getUserProfile, updateUserProfile, createToken };