import ContactCollection from "../models/contact.schema.js";

//get all contact
export const getAllContact = async (req, res, next) => {
  try {
    const contact = await ContactCollection.find();
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

//add new contact
export const addContact = async (req, res, next) => {
  try {
    const newContact = new ContactCollection(req.body);
    await newContact.save();
    const contact = await ContactCollection.find();
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

//update exist contact
export const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existContact = await ContactCollection.findById(id);
    if (existContact) {
      await ContactCollection.findByIdAndUpdate(id, req.body);
      const contact = await ContactCollection.find();
      res.json({ success: true, data: contact });
    } else {
      throw new Error("Contact is not exist.");
    }
  } catch (error) {
    next(error);
  }
};

//delete contact
export const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    await ContactCollection.deleteOne({ _id: id });
    const contact = await ContactCollection.find();
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};
