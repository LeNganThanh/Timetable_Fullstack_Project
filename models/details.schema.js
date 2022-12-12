import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  code: { type: String },
  methodName: { type: String },
  teacher: { type: String },
  room: { type: String },
  methodImage: {
    type: String,
    default: function () {
      return `https://joeschmoe.io/${this.methodName}`;
    },
  },
});

const DetailsCollection = mongoose.model("details", detailSchema);

export default DetailsCollection;
