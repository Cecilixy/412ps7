const bodyParser = require('body-parser');
const express = require('express');
const axios = require("axios");
const redis = require("redis");
const circularJson = require('circular-json');
let client = redis.createClient({
  host: 'localhost',
  port: 6379
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router()

router.post('/get-weather',(req, res) => {
  let response;
  let isRedis = false;
  const city = req.body.city;
  client.get(city, async function (err, data) {
    if (!data) {
      const url = `https://api.weatherapi.com/v1/current.json?key=9e99fe8822df4c9e8d6131519230904&q=${city}`;
      try {
        response = await axios.get(url);
      } catch (e) {
        response = '';
      }
      if (response) {
        response = circularJson.stringify(response);
      }
      client.set(city, response, function () {
        client.expire(city, 60);
      })
      isRedis = false;
    } else {
      response = data;
      isRedis = true;
    }
    let arr = [];
    if (response) {
      const { location, current } = circularJson.parse(response).data;
      arr = [{
        region: location.region,
        localtime: location.localtime,
        cloud: current.cloud,
        icon: current.condition.icon,
        text: current.condition.text,
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        vis_km: current.vis_km,
        vis_miles: current.vis_miles,
        wind_degree: current.wind_degree,
        wind_dir: current.wind_dir,
        wind_kph: current.wind_kph,
        wind_mph: current.wind_mph
      }];
    }
    const result = {
      data: arr,
      isRedis
    }
    res.send(result);
  });
})

app.use('/api', router);
app.listen(3000);

console.log('success listen at port:3000...');
