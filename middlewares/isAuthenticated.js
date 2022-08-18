const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    console.log(req.headers);
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("No token");
      return null;
    }

    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const theToken = tokenArr[1];

    if (tokenType !== "Bearer") {
      console.log("Invalid Token");
      return null;
    }

    console.log("Token exported");
    return theToken;
  },
});

module.exports = isAuthenticated;
