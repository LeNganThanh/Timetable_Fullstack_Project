import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  role: { type: String, enum: ["user", "manager"], default: "user" },
  token: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UsersCollection = mongoose.model("users", loginSchema);
UsersCollection.createIndexes({ email: 1 });

export default UsersCollection;
