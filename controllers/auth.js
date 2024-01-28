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
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Email and password invalid', 401);
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('Invalid User', 401);
    }
    //compare password
    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: 'Invalid Password' });
    }
    const token = user.createJWT();
    return res
        .status(StatusCodes.OK)
        .json({ user: { name: user.name }, token });
};

module.exports = {
    register,
    login,
};
