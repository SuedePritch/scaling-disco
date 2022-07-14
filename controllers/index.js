const router = require('express').Router();
const apiRoutes = require('./api');
//main router all routes are contained in the api folder
router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;