const UserModel = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bycrypt = require('bcryptjs'); //hashing the password

const register = async (req, res) => {
    const user = await UserModel.create({ ...req.body });
    return res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
    return res.send('Login User');
};

module.exports = {
    register,
    login,
};
