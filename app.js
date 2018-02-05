const http = require("http");
const express = require("express");
// Using moment.js a node package for using dates
const moment = require("moment");
const path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "/client/")));
app.use(express.static(path.join(__dirname, "/client/css/")));

app.get("/:request", function(req, res){
    var request = req.params.request;
    if(isNumeric(request)){
        var dateUnix = moment.unix(request).format("X");
        var dateNatural = moment.unix(request).format("MMMM DD, YYYY");
        var date = {
            "unix": dateUnix,
            "natural": dateNatural
        };
        res.send(date);
    }
    else{
        var dateUnix = moment(request).format("X");
        var dateNatural = moment(request).format("MMMM DD, YYYY");
        var date = {
            "unix": dateUnix,
            "natural": dateNatural
        };
        res.send(date);
    }
});

app.listen(process.env.PORT, function(){
    console.log("Now listening on port "+ process.env.PORT);
});

function isNumeric(num){
  return !isNaN(num)
}