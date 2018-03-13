const http = require("http");
const express = require("express");
// Using moment.js a node package for using dates
const moment = require("moment");
const path = require("path");
var app = express();

//Serve the static html and css files
app.use(express.static(path.join(__dirname, "/client/")));

//To handle the get request using express
app.get("/:request", function(req, res){
    //Saving the query
    var request = req.params.request;
    //Checking if the query is unixtime
    if(isNumeric(request)){
        var dateUnix = moment.unix(request).format("X");
        var dateNatural = moment.unix(request).format("MMMM DD, YYYY");
        var date = {
            "unix": dateUnix,
            "natural": dateNatural
        };
        res.send(date);
    }
    //if not unixtime, then natural time
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

//For the query check
function isNumeric(num){
  return !isNaN(num);
}

var listener = app.listen(process.env.PORT, function(){
    console.log("Now listening on port "+ listener.address().port);
});