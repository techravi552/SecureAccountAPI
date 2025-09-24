const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const users = await User.findOne({ email });
    if (users) return res.send("is User");

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();
    res.send("Registered");
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send("email Invalid");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("email Invalid");

    const token = jwt.sign({ id: user._id }, "secretkey");
    res.send({ token });
};
