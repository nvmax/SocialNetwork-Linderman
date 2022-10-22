// api routes index 

const router = require('express').Router();
const apiRoutes = require('./api');

// /api route router.use
router.use('/api', apiRoutes);

// router use to serve up the api
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
    });

module.exports = router;