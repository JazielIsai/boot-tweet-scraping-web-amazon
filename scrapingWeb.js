
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  const item_inmersion = [];
  async function getPageData() {
    await page.goto(
      "https://www.amazon.com.mx/gp/bestsellers/books/ref=zg_bs_pg_1?ie=UTF8&pg=1"
    );
    /*await page.screenshot({
        path: 'screenshot.png',
        fullPage: true,
     })*/
      const data = await page.evaluate(()=>{
        const $item_immersion = document.querySelectorAll(".zg-ordered-list");
        const $pagination = document.querySelectorAll('.a-row .a-text-center .a-pagination .a-normal a');
        //const totalPages = Number($pagination[$pagination.length - 1]);
        const data = [];
        $item_immersion.forEach(($item) => {
          data.push({
            author: $item.querySelector('.a-section .aok-inline-block .a-row .a-size-small'),//.innerHTML.trim(),
            nameBook: $item.querySelector('.p13n-sc-truncated'),//.innerHTML.trim(),
            //price: $item.querySelector('.a-row .a-link-normal .p13n-sc-price').textContent.trim(),
          })
        })
        return{
          item_inmersion: data,
          $pagination,
        }
     })
     
     console.log(data);
     //await Tweet.postTweet(data);
  }
  getPageData();
  //await browser.close();
}

module.exports = run();