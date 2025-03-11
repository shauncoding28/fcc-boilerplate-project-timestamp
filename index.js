// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


//returns unix and utc timestamp
app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    res.json({ error: "Date not valid" });
  }

  const unixDate = parsedDate.getTime();
  const utcDate = parsedDate.toUTCString();

  res.status(200).json({ unix: unixDate, utc: utcDate });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
