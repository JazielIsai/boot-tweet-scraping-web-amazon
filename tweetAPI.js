// API Key --> sju4nRN0oJjBn4T3aTc3AuUfw
// API Key Secret --> ccYmczcQdooe0aImCOVsI0JK6ySiwTCHh90Bk7DkK19urBxsVi
// Access Token --> 1453195308591050754-EZm3fY86WQLIrh9cBX3UVwqihv9Ztp
// Access Token Secret --> afRPnEoR9BYPctcWyFBGV5pXvrOPwCYyUKFlDqo7Vxhnv
// Bearer Token --> AAAAAAAAAAAAAAAAAAAAAKJ%2BVwEAAAAAI3vyK2xUQwG3uXpvPgiKDIrzcxo%3D0wHYeBgluKuAgpiV6AiE9C1LspKgeDEUM97UySukSynYrnMwtt
//
var twit = require("twit");

var Twitter = new twit({
  consumer_key: "sju4nRN0oJjBn4T3aTc3AuUfw",
  consumer_secret: "ccYmczcQdooe0aImCOVsI0JK6ySiwTCHh90Bk7DkK19urBxsVi",
  access_token: "1453195308591050754-EZm3fY86WQLIrh9cBX3UVwqihv9Ztp",
  access_token_secret: "afRPnEoR9BYPctcWyFBGV5pXvrOPwCYyUKFlDqo7Vxhnv",
  timeout_ms: 60 * 1000, //
  strictSSL: true, //opciones
});

let params = {};

Twitter.post("statuses/update", params, (err, data) => {
  try {
    if (err) {
      return reject(err);
    }
    return resolve(data);
  } catch (err) {
    return reject(err);
  }
});



/*
Twitter.post('statuses/update', {status: 'Trends book'})
.then((tweet) => {
    console.log(tweet);
})
.catch((err) => {
    console.log(err);
})
*/

module.exports = Twitter;
