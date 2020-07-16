const axios = require('axios')
const fs = require('fs');

const getBreeds = () => {
  try {
    return axios.get('https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=ca056096ef96b94d9aef6a1479942896&units=metric')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = getBreeds()
    .then(response => {
      let temperature = response.data.main.temp;
      let units = 'Celcius';
      let precipitation = response.data.rain ? 'true': 'false';
      let data = `${temperature},${units},${precipitation}\n`;
      let logData = `${temperature},${units},${precipitation}`
      fs.appendFileSync('data.csv', data, 'utf-8', function (err) {
        if (err) {
            console.log("error");
        }
      });
      console.log("[INFO] " + new Date + " data written to data.csv: [" + logData + "\b]");
    })
    .catch(error => {
      console.log(error);
    })
}

setInterval(() => {
    countBreeds();
}, 1000);





