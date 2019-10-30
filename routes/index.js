var express = require('express');
var router = express.Router();
var request = require('request');
var cityModel = require('./bdd');


var myWeatherAppKey = "b11cdca7d05ec861089f93e3a9c209ac";
var cityList;

/* GET home page. */
router.get('/', async function(req, res, next) {
    cityList = await cityModel.find(function(err, cities) {
        console.log(cities); // renvoi un tableau d’objet
    });
    res.render('index', { cityList });
});


/*POST add city*/
router.post('/add-city', function(req, res, next) {
    var city = req.body.city;
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${myWeatherAppKey}`, async function(error, response, body) {
        body = JSON.parse(body);
        console.log(body);
        var newCity = new cityModel({
            name: body.name,
            picto: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`,
            descr: body.weather[0].description,
            tempMin: body.main.temp_min,
            tempMax: body.main.temp_max
        });
        await newCity.save(
            function(error, user) {}
        );
        cityList = await cityModel.find(function(err, cities) {
            console.log(cities); // renvoi un tableau d’objet
        })
        res.render('index', { cityList });

    });
});

/*POST delete city*/
router.post('/delete-city', async function(req, res, next) {

    await cityModel.deleteOne({ name: req.body.city },
        function(error) {});
    cityList = await cityModel.find(function(err, cities) {});
    res.render('index', { cityList });
});



module.exports = router;