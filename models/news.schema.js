import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  news: { type: String, required: true },
});

const NewsCollection = mongoose.model("news", newsSchema);

export default NewsCollection;
