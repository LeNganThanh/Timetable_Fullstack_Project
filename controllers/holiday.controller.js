import HolidayCollection from "../models/holiday.schema.js";

//get all holiday info
export const getHoliday = async (req, res, next) => {
  try {
    const holiday = await HolidayCollection.find();
    res.json({ success: true, data: holiday });
  } catch (error) {
    next(error);
  }
};

//add holiday info
export const addHoliday = async (req, res, next) => {
  try {
    const holiday = new HolidayCollection(req.body);
    await holiday.save();
    res.json({ success: true, data: holiday });
  } catch (error) {
    next(error);
  }
};

//update exist holiday info
export const updateHoliday = async (req, res, next) => {
  try {
    const id = req.params.id;
    await HolidayCollection.findByIdAndUpdate(id, req.body);
    const allHoliday = await HolidayCollection.find();
    res.json({ success: true, data: allHoliday });
  } catch (error) {
    next(error);
  }
};
