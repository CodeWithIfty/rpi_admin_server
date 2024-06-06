const createToken = require("../../../lib/authentication/createToken");

const createAuthCookie = (req, res, next) => {
  try {
    const user = req.body;
    console.log("This user", req.body);
    const token = createToken(user);

    // Set expiration time for the cookie (in milliseconds)
    const expiration = 24 * 60 * 60 * 1000; // 1 day (adjust as needed)

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        expires: new Date(Date.now() + expiration),
      })
      .send({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = createAuthCookie;
