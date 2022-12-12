import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersCollection from "../models/users.schema.js";

export const getUsersData = async (req, res, next) => {
  try {
    const users = await UsersCollection.find();
    res.json({ success: true, users });
  } catch (error) {
    const err = "Cannot get users data.";
    err.status = 404;
    next(err);
  }
};
export const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UsersCollection.findById(id);
    res.json({ success: true, user });
  } catch (error) {
    const err = "Cannot get user data.";
    err.status = 404;
    next(err);
  }
};

export const addNewUser = async (req, res, next) => {
  try {
    //encrypt entered password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = new UsersCollection(req.body);
    await newUser.save();
    res.json({ success: true, user: newUser });
  } catch (error) {
    if (error.message.includes("E11000")) {
      next({ message: { username: "Login email is already exist!" } });
    }
  }
};

export const getLogin = async (req, res, next) => {
  try {
    //finding the exist user
    const user = await UsersCollection.findOne({ email: req.body.email });
    if (user) {
      //checking password
      const verify = await bcrypt.compare(req.body.password, user.password);
      if (verify) {
        //setting token for user
        let token = jwt.sign(
          { _id: user._id, firstName: user.firstName },
          process.env.TOKEN_SECRET_KEY
        );

        //get new user with token
        const updateUser = await UsersCollection.findByIdAndUpdate(
          user._id,
          { token: token },
          { new: true }
        );
        res.header("token", token);
        res.json({ success: true, data: updateUser });
      } else {
        throw new Error("Your password is wrong.");
      }
    } else {
      throw new Error("Email is not correct.");
    }
  } catch (error) {
    const err = new Error("Please register before login!");
    err.status = 403;
    next(err);
  }
};

export const getUpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    //set new hashed password after update password
    if (Object.keys(req.body).includes("password")) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPass;
    }

    //find user and update
    const updateUser = await UsersCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, user: updateUser });
  } catch (error) {
    const err = new Error("User cannot update");
    err.status = 403;
    next(err);
  }
};

export const getDeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existId = await UsersCollection.findById(id);
    if (existId) {
      await UsersCollection.deleteOne({ _id: existId });
      const users = await UsersCollection.find();
      res.json({ success: true, users });
    } else {
      throw new Error("User is not exist.");
    }
  } catch (error) {
    next(error);
  }
};

export const checkUserToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await UsersCollection.findById(decode._id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
