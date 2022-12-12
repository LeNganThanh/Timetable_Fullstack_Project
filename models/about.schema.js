import mongoose from "mongoose";

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  about: { type: String, required: true },
});

const AboutCollection = mongoose.model("about", aboutSchema);

export default AboutCollection;
