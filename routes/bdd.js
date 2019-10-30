var mongoose = require('mongoose');


var options = {
        connectTimeoutMS: 5000,
        useNewUrlParser: true
    }
    //mongoose.connect(‘mongodb://[info user]&[adresse serveur]/[nom DB]
mongoose.connect('mongodb+srv://hortense_gueneau:q5CAsYqys760amwC@cluster0-iminb.mongodb.net/weatherapp',
    options,
    function(err) {
        console.log(err);
    }
);

var citySchema = mongoose.Schema({
    name: "String",
    picto: "String",
    descr: "String",
    tempMin: Number,
    tempMax: Number
});
var cityModel = mongoose.model('cities', citySchema);



module.exports = cityModel;