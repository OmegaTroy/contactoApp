import { ContactModel } from "../models/contacts.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, number } = req.body;
    const userId = req.user.id;
    const newContact = await ContactModel.create({ name, number, userId });
    const contactSave = await newContact.save();
    res.json({ contactSave });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  let userID = req.user.id;
  try {
    const contacts = await ContactModel.findAll({
      where: {
        userId: userID,
      },
    });
    const contactFoud = contacts.map((con) => con.dataValues);
    res.json(contactFoud);
  } catch (error) {
    res.status(404).json({ message: "Could not get contacts" });
  }
};

export const getContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const name = req.params.name;
    const contactFoud = await ContactModel.findAll({ where: { name } });
    const validatorContact = contactFoud.some(
      (contact) => contact.userId == userId
    );
    if (!validatorContact)
      return res
        .status(404)
        .json({ message: "this is not the contact you are looking for" });
    res.json(contactFoud);
  } catch (error) {
    res
      .status(404)
      .json({ message: "this is not the contact you are looking for" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const conctac = await ContactModel.destroy({ where: { id } });
    if (!conctac) return res.status(404).json({ message: "contact not found" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "contact Not Found" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { name, number } = req.body;
    const conctacName = req.params.name;
    const contactFoud = await ContactModel.findOne({
      where: { name: conctacName },
    });
    const contactUpdate = await contactFoud.update({ name, number });
    if (!contactUpdate)
      return res.status(404).json({ message: "contact not found" });
    return res.json(contactUpdate);
  } catch (error) {
    res.status(404).json({ message: "contact Not Found" });
  }
};
