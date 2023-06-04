const {
  getHashedPassword,
  comparePassword,
} = require("../middlewares/encrytPassword");
const Users = require("../models/Users");
const { successlog, errorlog } = require("../utils/loggers");
const { returnSignedToken } = require("../utils/token");

const LoginMiddleWare = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      email,
    });
    const actualPassword = await comparePassword(user.password, password);
    if (actualPassword) {
      const accessToken = await returnSignedToken({
        _id: user._id,
        email,
      });
      successlog.info(`${user._id} ${email} logged in successfully`);
      res.status(200).json({
        email,
        accessToken,
      });
    } else {
      errorlog.error(`${user._id} ${email} password doesn't match`);
      res.status(400).json({ error: "password doesn't match" });
    }
  } catch (e) {
    errorlog.error(`${email} doesn't exist`);
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
        email,
      });
      successlog.info(`${user._id} ${email} signed in successfully`);
      res.status(201).json({
        user,
        token,
      });
    } else {
      errorlog.error(`${email} User with email already exist`);
      res.status(400).json({ error: "User with email already exist" });
    }
  } catch (e) {
    errorlog.error(`${email} Error in user creation`);
    res.status(400).json({ error: "Error in user creation" });
  }
};

module.exports = { LoginMiddleWare, SignUpMiddleWare };
