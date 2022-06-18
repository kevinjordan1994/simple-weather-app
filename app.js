`use strict`;

const express = require(`express`);
const https = require(`https`);
const bodyParser = require(`body-parser`);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, function (req, res) {
  res.sendFile(__dirname + `/index.html`);
});

app.post(`/`, function (req, res) {
  const city = req.body.cityName;
  const unit = `imperial`;
  const apiKey = `012c82b629935f51edc07aae1a76a254`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  https.get(url, function (response) {
    response.on(`data`, function (data) {
      const wxData = JSON.parse(data);
      const temp = wxData.main.temp;
      const description = wxData.weather[0].description;
      const icon = wxData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The temperature in ${city} is ${Math.round(temp)}F.</h1>`);
      res.write(`<h3>The weather is ${description}</h3>`);
      res.write(`<img src="${imgURL}">`);

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log(`Tuned into port 3000.`);
});
