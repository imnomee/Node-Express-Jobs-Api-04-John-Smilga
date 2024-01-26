const register = async (req, res) => {
    return res.send('Register User');
};

const login = async (req, res) => {
    return res.send('Login User');
};

module.exports = {
    register,
    login,
};
