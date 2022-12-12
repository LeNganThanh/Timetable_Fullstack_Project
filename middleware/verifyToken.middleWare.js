import jwt from "jsonwebtoken";
import UsersCollection from "../models/users.schema.js";

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    //verify the user token
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    //get the user
    const user = await UsersCollection.findById(decodeToken._id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
