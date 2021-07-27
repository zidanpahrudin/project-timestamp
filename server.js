// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/:date_string?", (req, res) => {
  let { date_string } = req.params;
  let isDate = new Date(date_string);

  if (/\d{5,}/.test(date_string)) {
    let numUnix = parseInt(date_string);
    let unixToDate = new Date(numUnix).toUTCString();
    res.json({ unix: numUnix, utc: unixToDate });
  } else {
    if (isDate) {
      if (!isNaN(isDate.getTime())) {
        let datum = Date.parse(date_string);
        let humanDateFormat = new Date(datum);
        let utcDate = humanDateFormat.toUTCString();
        res.json({
          unix: datum,
          utc: `${utcDate}`,
        });
      } else {
        res.json({
          error: "invalid date",
        });
      }
    }
  }
});

// app.get("/api/:date_string?", (req, res) => {
//   let dateString = req.params.date_string;
//   if (/\d{5,}/.test(dateString)) {
//     const dateInt = parseInt(dateString);

//     res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
//   } else {
//     let dateObject = new Date(dateString);

//     if (dateObject.toString() === "Invalid Date") {
//       res.json({ error: "Invalid Date" });
//     } else {
//       res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
//     }
//   }
// });
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
