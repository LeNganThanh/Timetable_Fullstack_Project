import AboutCollection from "../models/about.schema.js";

//get all about class info
export const getAbout = async (req, res, next) => {
  try {
    const about = await AboutCollection.find();
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

//add new about class info
export const addAbout = async (req, res, next) => {
  try {
    const newAbout = new AboutCollection(req.body);
    await newAbout.save();
    const about = await AboutCollection.find();
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

//update exist about info
export const updateAbout = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AboutCollection.findByIdAndUpdate(id, req.body);
    const about = await AboutCollection.find();
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};
