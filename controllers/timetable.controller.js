import TimetableCollection from "../models/timetableData.schema.js";

//get data
export const getTimetableData = async (req, res, next) => {
  try {
    const timetable = await TimetableCollection.find();
    res.json({ success: true, data: timetable });
  } catch (error) {
    next(error);
  }
};

//update data
export const getUpdateTimetable = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = await TimetableCollection.findByIdAndUpdate(
      id,
      req.body
    );
    const timetable = await TimetableCollection.find();
    res.json({ success: true, data: timetable });
  } catch (error) {
    next(error);
  }
};

//add data
export const getAddTimetable = async (req, res, next) => {
  try {
    const timetable = new TimetableCollection(req.body);
    await timetable.save();
    const timeData = await TimetableCollection.find();
    res.json({ success: true, data: timeData });
  } catch (error) {
    next(error);
  }
};

//delete data
export const getDeleteTimetable = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existId = await TimetableCollection.findById(id);
    if (existId) {
      await TimetableCollection.findByIdAndDelete(existId);
      const timetable = await TimetableCollection.find();
      res.json({ success: true, data: timetable });
    } else {
      throw new Error("Cannot delete timetable.");
    }
  } catch (error) {
    next(error);
  }
};
