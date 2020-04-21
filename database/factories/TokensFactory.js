const faker = require("faker");
const Token = {
  authorization: faker.random.uuid(),
  deviceToken: faker.random.uuid(),
  fingerPrint: faker.random.uuid(),
};

const make = (count = 1) => {
  return Token;
};
module.exports = { Token, make };
