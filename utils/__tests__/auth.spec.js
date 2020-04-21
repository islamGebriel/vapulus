const tokens = require("./../../config/auth.json");
const request = require("supertest");
const { server } = require("./../../server");
const db = require("./../../models/index");
describe("auth", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await server.close();
    await db.sequelize.truncate({ force: true });
  });
  it("return 401 Unauthorized if no tokens provided", async () => {
    let res = await request(server).post("/contacts/addContact");
    expect(res.status).toBe(401);

    res = await request(server).post("/contacts/getList");
    expect(res.status).toBe(401);

    res = await request(server).post("/contacts/getRecentList");
    expect(res.status).toBe(401);
  });
  it("return 401 Unauthorized if tokens not match", async () => {
    const invaledTokens = {
      authorization: "eyJhbGci",
      deviceToken: "uPUePid0",
      fingerPrint: "123456789",
      name: "User A",
    };
    let res = await request(server)
      .post("/contacts/addContact")
      .send(invaledTokens);
    expect(res.status).toBe(401);

    res = await request(server).post("/contacts/getList").send(invaledTokens);
    expect(res.status).toBe(401);

    res = await request(server)
      .post("/contacts/getRecentList")
      .send(invaledTokens);
    expect(res.status).toBe(401);
  });
  it("unlocks if the tokens valid and exist", async () => {
    const token = tokens[0];
    let res = await request(server).post("/contacts/addContact").send(token);
    expect(res.status).toBe(200);

    res = await request(server).post("/contacts/getList").send(token);
    expect(res.status).toBe(200);

    res = await request(server).post("/contacts/getRecentList").send(token);
    expect(res.status).toBe(200);
  });
});
