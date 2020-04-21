const express = require("express");
const app = express();
const { json, urlencoded } = require("body-parser");

const db = require("./models/index");
const env = process.env.NODE_ENV || "development";
const config = require("./config/server.json")[env];

const { protect } = require("./utils/auth");
const ContctsRouter = require("./routes/ContactsRouter");

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(protect);
app.use("/contacts", ContctsRouter);
app.get("/", async (req, res) => {
  const contacts = await db.Contact.findAll({ limit: 10, offset: 2 });
  res.status(200).json({ data: contacts });
});

let server;
const start = () => {
  server = app.listen(config.port, () => {
    console.log(`server started at http://localhost:9080`);
  });
};
start();

module.exports = { app, start, server };
