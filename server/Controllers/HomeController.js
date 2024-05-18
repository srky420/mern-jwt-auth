const User = require("../Models/UserModel");

module.exports.Home = async (req, res) => {

    // Get user from req obj
    const user = await User.findById(req.id);
    if (!user) {
        return res.json({ status: false });
    }

    res.status(200).json({ status: true, username: user.username })
}