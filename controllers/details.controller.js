import DetailsCollection from "../models/details.schema.js";

export const getAllDetails = async (req, res, next) => {
  try {
    const details = await DetailsCollection.find();
    res.json({ success: true, details });
  } catch (error) {
    next(error);
  }
};

export const getSingleDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const detail = await DetailsCollection.findById(id);
    res.json({ success: true, data: detail });
  } catch (error) {
    next(error);
  }
};

export const getAddDetails = async (req, res, next) => {
  console.log(req.body);
  try {
    const newDetail = new DetailsCollection(req.body);

    //adding image
    if (req.file) {
      newDetail.methodImage = `/${req.file.filename}`;
    }
    await newDetail.save();
    res.json({ success: true, data: newDetail });
  } catch (error) {
    next({ message: "Cannot add new details." });
  }
};

export const getUpdateDetails = async (req, res, next) => {
  try {
    let method = await DetailsCollection.findById(req.params.id);
    if (req.file) {
      method.methodImage = `/${req.file.filename}`;
    }

    await method.save();

    let newBody = {};
    for (const key in req.body) {
      if (req.body[key] !== "") {
        newBody[key] = req.body[key];
      }
    }

    const id = req.params.id;
    const updateDetail = await DetailsCollection.findByIdAndUpdate(
      id,
      newBody,
      { new: true }
    );

    res.json({ success: true, data: updateDetail });
  } catch (error) {
    next({ message: "Cannot update detail timetable." });
  }
};

export const getDeleteDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existId = DetailsCollection.findById(id);
    if (existId) {
      await DetailsCollection.findByIdAndDelete(id);
      const details = await DetailsCollection.find();
      res.json({ success: true, data: details });
    } else {
      throw new Error("Method is not exist!");
    }
  } catch (error) {
    next(error);
  }
};
