const getAllJobs = async (req, res) => {
    return res.send('Get all jobs');
};

const getJob = async (req, res) => {
    return res.send('Get job');
};

const createJob = async (req, res) => {
    return res.send('Create Job');
};

const updateJob = async (req, res) => {
    return res.send('Update Job');
};
const delJob = async (req, res) => {
    return res.send('Delete Job');
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    delJob,
};
