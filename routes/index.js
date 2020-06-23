const path = require('path');
const router = require('express').Router();
const apiRoutes = require('.');

// API Routes
router.use('/api', apiRoutes);

// if no API routes are hit, send the React app
router.use((request, response) => {
    response.sendFile(path.join(__dirname, '../client/build/index.html'))
});

module.exports = router;
