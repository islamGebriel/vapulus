const {
  addNewContact,
  findUserContacts,
  recentContacts,
} = require("./ContactsController");
const ContactsFactory = require("./../database/factories/ContactsFactory");
const TokensFactory = require("./../database/factories/TokensFactory");
const db = require("./../models/index");
describe("ContactsController", () => {
  let tokens;
  let contact;
  let contacts;
  let results;
  let status;
  function exec(body) {
    const req = {
      body,
      method: "post",
    };
    const res = {
      status(code) {
        status = code;
        return this;
      },
      json(payload) {
        results = payload;
      },
    };
    return { req, res };
  }
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    contact = ContactsFactory.make();
    contacts = ContactsFactory.make(8);
    await db.Contact.bulkCreate(contacts);
    tokens = TokensFactory.make();
  });
  afterEach(async () => {
    await db.sequelize.truncate();
  });

  describe("addContact", () => {
    test("creates new contact", async () => {
      const { req, res } = exec({ ...contact, ...tokens });
      await addNewContact(req, res);
      expect(status).toBe(200);
      expect(results.message).toBe("Success");
      expect(results.data).toEqual(expect.objectContaining(contact));
    });
  });
  describe("findUserContacts", () => {
    test("get All user Contacts", async () => {
      const { req, res } = exec({ ...tokens });
      await findUserContacts(req, res);
      expect(status).toBe(200);
      expect(results.message).toBe("Success");
      expect(results.data).toHaveLength(8);
      expect(
        results.data.forEach((item) => expect(typeof item).toBe("object")) //TODO
      );
    });
  });
  describe("recentContacts", () => {
    test("retruns the 5 latest transactions with user contacts", async () => {
      const { req, res } = exec({ ...tokens });
      await recentContacts(req, res);
      expect(status).toBe(200);
      expect(results.message).toBe("Success");
      expect(results.data).toHaveLength(5);
      expect(
        results.data.forEach((item) => expect(typeof item).toBe("object")) //TODO
      );
    });
  });
});
