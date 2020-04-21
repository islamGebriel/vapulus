"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      userId: {
        type: DataTypes.STRING,
      },
      contactId: {
        type: DataTypes.STRING,
      },
      relationId: {
        type: DataTypes.STRING,
      },
      mobileNumber: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Contact.associate = function (models) {
    // associations can be defined here
  };
  return Contact;
};
