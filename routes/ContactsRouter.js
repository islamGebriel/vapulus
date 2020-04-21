const { Router } = require("express");
const ContactsController = require("./../controllers/ContactsController");
const router = Router();
router.post("/addContact", ContactsController.addNewContact);
router.post("/getList", ContactsController.findUserContacts);
router.post("/getRecentList", ContactsController.recentContacts);
module.exports = router;
