const {
  getHashedPassword,
  comparePassword,
} = require("../middlewares/encrytPassword");
const Users = require("../models/Users");
const { sign } = require("jsonwebtoken");

const LoginMiddleWare = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    console.log(user);
    const actualPassword = await comparePassword(user.password, password);
    console.log(actualPassword);
    if (actualPassword) {
      const token = await returnSignedToken({ _id: user._id, password, email });
      res.status(200).json({
        user,
        token,
      });
    } else {
      res.status(400).json({ error: "password doesn't match" });
    }
  } catch {
    res.status(400).json({ error: "user doesn't exist" });
  }
};

const SignUpMiddleWare = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await Users.findOne({ email });
    if (!alreadyUser) {
      const hashedPassword = await getHashedPassword(password);
      const user = await new Users({
        ...req.body,
        password: hashedPassword,
      }).save();
      const token = await returnSignedToken({
        _id: user._id,
        hashedPassword,
        email,
      });
      res.status(200).json({
        user,
        token,
      });
    } else {
      res.status(400).json({ error: "User with email already exist" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Error in user creation" });
  }
};

const returnSignedToken = async (data) => {
  return await sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
};

module.exports = { LoginMiddleWare, SignUpMiddleWare };
