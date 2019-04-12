const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");
module.exports = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {username, email, password} = req.body
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("email exists")

  userLogin = new User({
    username,
    email,
    password
  });

  const hash = await bcrypt.genSalt(10);
  userLogin.password = await bcrypt.hash(userLogin.password, hash);
  user = await userLogin.save();
  res.redirect('/auth/login')
};
