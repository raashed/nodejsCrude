var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', function (req, res) {
    res.render('index');
}); // huhuuh

module.exports = router;
