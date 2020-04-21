const faker = require("faker");
const Contact = {
  email: faker.internet.email(),
  mobileNumber: faker.phone.phoneNumber(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};
const make = (count = 1) => {
  if (count > 1) {
    const mocks = [];
    for (let i = 0; i < count; i++) mocks.push(Contact);
    return mocks;
  }
  return Contact;
};

module.exports = {
  Contact,
  make,
};
