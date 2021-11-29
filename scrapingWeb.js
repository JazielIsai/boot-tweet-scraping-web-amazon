//const { postTweet } = require("./tweetAPI.js");
//const Scraping = require("./scrapingWeb");

//CODIGO FUNCIONAL 
const puppeteer = require("puppeteer");

var twit = require("twit");

var Twitter = new twit({
  consumer_key: "sju4nRN0oJjBn4T3aTc3AuUfw",
  consumer_secret: "ccYmczcQdooe0aImCOVsI0JK6ySiwTCHh90Bk7DkK19urBxsVi",
  access_token: "1453195308591050754-EZm3fY86WQLIrh9cBX3UVwqihv9Ztp",
  access_token_secret: "afRPnEoR9BYPctcWyFBGV5pXvrOPwCYyUKFlDqo7Vxhnv",
  timeout_ms: 60 * 1000, //
  strictSSL: true, //opciones
});

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const item_inmersion = [];
  async function getPageData() {
    await page.goto(
      "https://www.amazon.com.mx/gp/bestsellers/books/ref=zg_bs_pg_1?ie=UTF8&pg=1"
    );
    const data = await page.evaluate(() => {
      const $item_immersion = document.querySelectorAll("#zg-ordered-list");
      //const $pagination = document.querySelectorAll(".a-row .a-text-center .a-pagination .a-normal a");
      //const totalPages = Number($pagination[$pagination.length - 1]);
      const dataBook = [];
      $item_immersion.forEach(($item) => {
        dataBook.push({
          author: $item
            .querySelector(".a-section .aok-inline-block .a-row .a-size-small")
            .textContent.trim(),
          nameBook: $item
            .querySelector(".p13n-sc-truncated")
            .textContent.trim(),
          price: $item
            .querySelector(".a-row .a-link-normal .p13n-sc-price")
            .textContent.trim(),
          //link: $item.querySelector('.a-section .aok-inline-block a').textContent.trim(),
        });
      });
      return {
        dataBook
        //$pagination,
      };
    });

    console.log(data);
    console.log(`Autor del libro: ${data.dataBook[0].author} Nombre del Libro: ${data.dataBook[0].nameBook} Precio: ${data.dataBook[0].price}`);

    Twitter.post("statuses/update", { status: `Autor del libro: ${data.dataBook[0].author} Nombre del Libro: ${data.dataBook[0].nameBook} Precio: ${data.dataBook[0].price}` })
      .then((tweet) => {
        console.log(tweet);
      })
      .catch((err) => {
        console.log(err);
      });
    //await Tweet.postTweet(data);
  }

  getPageData();

  /*
  postTweet()
    .then(product => console.log(product))
    .catch(error => console.log(error))
  ;*/

  //await browser.close();
}

run();
//Tweet.postTweet("Hola");
