const UserModel = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const user = await UserModel.create({ ...req.body });
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        token,
    });
};

const login = async (req, res) => {
    return res.send('Login User');
};

module.exports = {
    register,
    login,
};
