import mongoose from "mongoose";

const Schema = mongoose.Schema;

const holidaySchema = new Schema({
  holiday: { type: String, required: true },
});

const HolidayCollection = mongoose.model("holiday", holidaySchema);

export default HolidayCollection;
