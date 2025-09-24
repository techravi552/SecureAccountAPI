const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body

  
    if (!email || !password || !newPassword) {
      return res.status(400).send("not valid email password or newpassword")
    }

 
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).send("User not found")

   
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).send("invalid password")

 
    user.password = await bcrypt.hash(newPassword, 10)

    await user.save()

    res.send("Password reset ")
  } catch (error) {
    console.log(error);
    res.status(500).send("errore");
  }
};
