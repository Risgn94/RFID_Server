var express = require('express');
var router = express.Router();
var DatabaseModule = require('../DB/DatabaseLogic');
var DatabaseLogic = new DatabaseModule();

/* GET home page. */
router.get('/', function (req, res) {
    DatabaseLogic.getAllLocations(function (data) {
        res.render('index', {
            doctors: data[0],
            patients: data[1],
            equipment: data[2]
        });
    });

});

router.get('/placements/all', function (req, res) {
    DatabaseLogic.getAllLocations(function (data) {
        res.json(data);
    });
});

router.post('/placements/update', function (req, res) {
    var pb = req.body;
    console.log(pb);
    DatabaseLogic.updateLocation(pb.RFID_Card, pb.Room_Id, function (answer) {
        console.log("Index file");
    });
    res.sendStatus(200);
});

module.exports = router;
