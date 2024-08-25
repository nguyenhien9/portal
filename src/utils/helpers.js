const crypto = require("crypto");

const generateRandomCode = (prefix) => {
  return `${prefix}${crypto.randomUUID().substring(0, 6).toUpperCase()}`;
};
module.exports = generateRandomCode;
