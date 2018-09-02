// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Endpoint For time stamp with empty string
app.get("/api/timestamp", function (req, res) {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// Endpoint for Time Stamp Retrieval
app.get("/api/timestamp/:date_string", function (req, res) {
  let time = req.params['date_string'];
  let unix = {"unix": undefined, "utc": undefined};
  try {
    let date = new Date(time);
    unix['unix'] = date.getTime();
    unix['utc'] = date.toUTCString();
  }
  catch(err) {
    unix['unix'] = null;
    unix['utc'] = "Invalid Date";
  }
  res.json(unix);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});