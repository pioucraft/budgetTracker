const { Convert } = require("easy-currencies");
//const { getCryptoRates } = require('crypto-exchange-rates');

/*getCryptoRates(['SOLUSDT', 'ETHUSDT'])
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
*/
Convert(15).from("USD").to("EUR").then(data => console.log(data))

//global.window.Convert = Convert
//https://query1.finance.yahoo.com/v8/finance/chart/%5Efchi
