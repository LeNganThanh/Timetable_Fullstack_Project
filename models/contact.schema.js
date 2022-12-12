import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  contact: { type: String, required: true },
});

const ContactCollection = mongoose.model("contact", contactSchema);

export default ContactCollection;
