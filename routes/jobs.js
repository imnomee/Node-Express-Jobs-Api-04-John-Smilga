const express = require('express');
const router = express.Router();

const {
    getJob,
    getAllJobs,
    createJob,
    updateJob,
    delJob,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(delJob);

module.exports = router;
