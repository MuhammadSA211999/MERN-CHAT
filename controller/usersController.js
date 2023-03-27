const bcrypt = require('bcrypt');
const People = require('../models/peoples');
// get users page
function getUsers(req, res, next) {
  res.render("users");
}

const addUser = async (req, res, next) => {
  let newUser = null
  const { password } = req.body
  const hashedPassword = await bcrypt.hash(password, 12)
  if (req.files && req.files.length > 0) {
    newUser = new People({
      ...req.body,
      password: hashedPassword,
      avatar: req.files[0].filename
    })
  }
  else {
    newUser = new People({
      ...req.body,
      password: hashedPassword
    })
  }
  try {
    const user = await newUser.save()
    res.status(200).json({ message: 'User was added successfully', data: user })
  } catch (error) {
    res.status(500).json({ error: { common: { msg: error.messsage } } })
  }
}

module.exports = {
  getUsers, addUser
};
