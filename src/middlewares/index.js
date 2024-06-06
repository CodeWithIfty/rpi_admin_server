const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { LOCAL_CLIENT, CLIENT } = require("../config/defaults");

const applyMiddleware = (app) => {
  app.use(
    cors({
      origin: [LOCAL_CLIENT, CLIENT],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.json());
};

module.exports = applyMiddleware;
