const tokens = require("./../config/auth.json");
const protect = (req, res, next) => {
  if (tokenNotExist(req) || !validateTokens(req))
    return res.status(401).json({ message: "Unauthorized" }).end();
  next();
};

module.exports = { protect };

function tokenNotExist(req) {
  return (
    !req.body.authorization || !req.body.deviceToken || !req.body.fingerPrint
  );
}

function validateTokens({ body }) {
  return tokens.find(
    ({ authorization, deviceToken, fingerPrint, name }) =>
      authorization == body.authorization &&
      deviceToken == body.deviceToken &&
      fingerPrint == body.fingerPrint &&
      name == body.name
  );
}
