const db = require("./../models");
const addNewContact = async (req, res) => {
  try {
    const contact = await db.Contact.create({ ...req.body });
    res.status(200).json({ message: "Success", data: contact.toJSON() });
  } catch (err) {
    console.log("error", err);
    if (err.name == "SequelizeValidationError") {
      res.status(400).json({ message: err.message, type: err.type }).end();
    }
  }
};
const findUserContacts = async (req, res) => {
  try {
    const contacts = await db.Contact.findAll();
    res.status(200).json({ message: "Success", data: contacts });
  } catch (err) {
    console.log("error", err);
    res.status(400).end();
  }
};
const recentContacts = async (req, res) => {
  try {
    const contacts = await db.Contact.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 5,
    });
    res.status(200).json({ message: "Success", data: contacts });
  } catch (err) {
    console.log("error", err);
    res.status(400).end();
  }
};

module.exports = {
  addNewContact,
  findUserContacts,
  recentContacts,
};
