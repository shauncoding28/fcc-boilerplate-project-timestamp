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
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let parsedDate;

  //creates date if none is provided
  if (!dateParam) {
    parsedDate = new Date();
  } else {
    // Checks if dateParam is a number
    const isUnixTimestamp = /^\d+$/.test(dateParam);
    if (isUnixTimestamp) {
      parsedDate = new Date(parseInt(dateParam, 10));
    } else {
      parsedDate = new Date(dateParam);
    }
  };


  // Checks date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  //console.log('Parsed Date:', parsedDate);
  //console.log('Unix Timestamp:', parsedDate.getTime());
  // Converts to unix and utc
  const unixDate = parsedDate.getTime();
  const utcDate = parsedDate.toUTCString();

  // Send the response with both Unix and UTC dates
  return res.json({ unix: unixDate, utc: utcDate });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
