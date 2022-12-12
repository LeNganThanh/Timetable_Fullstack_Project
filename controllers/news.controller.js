import NewsCollection from "../models/news.schema.js";

export const getNews = async (req, res, next) => {
  try {
    const news = await NewsCollection.find();
    res.json({ success: true, data: news });
  } catch (error) {
    next({ message: "There are no news!" });
  }
};

export const getAddNews = async (req, res, next) => {
  try {
    const getNews = new NewsCollection(req.body);

    await getNews.save();
    const news = await NewsCollection.find();
    res.json({ success: true, data: news });
  } catch (error) {
    next({ message: "Cannot add news." });
  }
};

export const getUpdateNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateNews = await NewsCollection.findByIdAndUpdate(id, req.body);
    const news = await NewsCollection.find();
    res.json({ success: true, data: news });
  } catch (error) {
    next({ message: "No news to update." });
  }
};

export const getDeleteNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    await NewsCollection.deleteOne({ _id: id });
    const news = await NewsCollection.find();
    res.json({ success: true, data: news });
  } catch (error) {
    next({ message: "No news to deletes." });
  }
};
