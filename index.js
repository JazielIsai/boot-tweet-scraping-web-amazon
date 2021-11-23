const { postTweet } = require("./tweetAPI.js");
//const Scraping = require("./scrapingWeb");

const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  const item_inmersion = [];
  async function getPageData() {
    await page.goto(
      "https://www.amazon.com.mx/gp/bestsellers/books/ref=zg_bs_pg_1?ie=UTF8&pg=1"
    );
      const data = await page.evaluate(() => {
        const $item_immersion = document.querySelectorAll("#zg-ordered-list");
        const $pagination = document.querySelectorAll('.a-row .a-text-center .a-pagination .a-normal a');
        //const totalPages = Number($pagination[$pagination.length - 1]);
        const dataBook = [];
        $item_immersion.forEach(($item) => {
          dataBook.push({
            author: $item.querySelector('.a-section .aok-inline-block .a-row .a-size-small').textContent.trim(),
            nameBook: $item.querySelector('.p13n-sc-truncated').textContent.trim(),
            price: $item.querySelector('.a-row .a-link-normal .p13n-sc-price').textContent.trim(),
            //link: $item.querySelector('.a-row .aok-inline-block .a-link-normal href').textContent.trim(),
          })
        })
        return{
          item_inmersion: dataBook,
          $pagination,
        }
     });
     
     console.log(data);
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