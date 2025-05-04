import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', '../views');

let jobs = [];
let nextId = 1;

app.get('/jobs', (req, res) => {
    res.render('index', { jobs });
});

app.get('/new-job', (req, res) => {
    res.render('job-form', {
        title: 'Post a new job',
        method: 'post',
        action: '/jobs',
        submitButtonText: 'Post Job',
        job: null,
    });
});

app.post('/jobs', (req, res) => {
    const newJob = {
        id: nextId++,
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        location: req.body.location,
    };
    jobs.push(newJob);
    res.render('job-card', { job: newJob });
});

app.get('/edit-job/:id', (req, res) => {
    const jobId = parseInt(req.params.id);
    const jobToEdit = jobs.find((job) => job.id === jobId);
    if (!jobToEdit) {
        return res.sendStatus(40);
    }

    return res.render('job-form', {
        title: 'Edit job',
        method: 'put',
        action: `/jobs/${jobId}`,
        submitButtonText: 'Update Job',
        job: jobToEdit,
        submitButtonText: 'Update Job',
    });
});

app.put('/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id);
    const jobIndex = jobs.findIndex((job) => job.id === jobId);
    if (!jobIndex) {
        return res.sendStatus(404);
    }
    jobs[jobIndex] = { id: jobId, ...req.body };

    res.render('job-card', { job: jobs[jobIndex] });
});

app.delete('/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id);
    const initialLength = jobs.length;
    jobs = jobs.filter((job) => job.id !== jobId);
    if (jobs.length < initialLength) {
        return res.sendStatus(204);
    } else {
        return res.sendStatus(404);
    }
});

app.get('/', (req, res) => {
    return res.render('index', { jobs });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
