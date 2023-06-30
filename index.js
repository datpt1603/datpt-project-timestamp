// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get('/api/:date', (req, res) => {
  const inputDate = req.params.date;
  const timestamp = parseInt(inputDate);

  let dateObj = new Date(inputDate);
  if (dateObj.toString() === 'Invalid Date') {

    // Check if the timestamp is valid
    if (isNaN(timestamp)) {
      res.status(400).json({ error: 'Invalid date' });
      return;
    }

    dateObj = new Date(timestamp);
  }

  if (dateObj.toString() === 'Invalid Date') {
    res.status(400).json({ error: 'Invalid date' });
    return;
  }
  
  const unixTimestamp = dateObj.getTime();
  const utcString = dateObj.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcString });
});

app.get('/api', function(req, res) {
  const now = new Date();
  console.log(now);
  const unixTimestamp = now.getTime();
  const utcString = now.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcString });
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
