import mongoose from "mongoose";

const timetableDataSchema = new mongoose.Schema({
  time: { type: String },
  monday: { type: String, default: "-" },
  tuesday: { type: String, default: "-" },
  wednesday: { type: String, default: "-" },
  thursday: { type: String, default: "-" },
  friday: { type: String, default: "-" },
});

const TimetableCollection = mongoose.model(
  "timetableData",
  timetableDataSchema
);

export default TimetableCollection;
