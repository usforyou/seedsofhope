const router = require('express').Router();

router.get('/ping', (req, res) => {
    res.json({"message": "server is up and running!"})
});

module.exports = {
    router
};