
// Importaciones de las librerias de node que se ocupan
require('dotenv').config(); //variables de entorno
const puppeteer = require("puppeteer"); // libreria que permite el scraping
const Tweet = require('twit'); //libreria de twitter

//Conexion a la app de Twitter al boot
const Twitter = new Tweet({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 5000, //
  strictSSL: true, //opciones
}); 

//Funcion que hace el scraping a la pagina de amazon, obteniendo los nombres, precio y el autor del libro
async function scrapingWeb() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
     
    await page.goto("https://www.amazon.com.mx");
    /*await page.screenshot({
          path: 'screenshot.png',
          fullPage: true,
       })*/
    await page.type("#twotabsearchtextbox", "Libros de Programación");
    await page.click(".nav-search-submit #nav-search-submit-button");
    await page.waitForSelector("[data-component-type=s-search-result]");
    //await page.screenshot({path: 'amazonComponent.png'});
    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll("[data-component-type=s-search-result] h2 a");
      const links = [];
      for (let element of elements) {
        links.push(element.href);
      }
      return links;
    });
    //console.log(enlaces.length)
    const booksData = [];

    for (let enlace of enlaces) {
      await page.goto(enlace);
      await page.waitForSelector("#productTitle");

      const databook = await page.evaluate(() => {
        try {
          const data = {};
          data.title = document.querySelector("#productTitle").innerText;
          data.author = document.querySelector(".author a").innerText;
          data.price = document.querySelector(".swatchElement .a-button-inner .a-size-base").innerText;
          //data.link = enlace;
          return data;

        } catch (err) {
          console.log(err);
        }
      });
      booksData.push(databook);
    }
    //console.log(booksData);
    return booksData;
    //await browser.close();
  } catch (err) {
    console.log(err);
  }
}

/*
let propiedadesBooks = [];
let index = 0;

propitiesBook()
  .then( (twetear) => {
    propiedadesBooks = twetear;
    console.log(propiedadesBooks);
  })
  .catch(err => {
    console.log(err);
  })

*/

/*
async function Send(){
  let get = await run();
  console.log(get);
}
Send();
*/

//va a buscar los libors por medio del scraping para despues publicarlos
async function fetch_publishertweet() {
  try {
    
    //console.log(propiedadesBooks);
    let propiedadesBooks = await scrapingWeb();
    
    let i = 0;

    console.log(i);
    let myInterval = setInterval(() => {
      Twitter.post("statuses/update", {
        status: `Amazon te ofrece los mejores libros de programacion, el titulo: ${propiedadesBooks[i].title} su autor: ${propiedadesBooks[i].author}, su precio es: ${propiedadesBooks[i].price} `,
      })
        .then((tweet) => {
          console.log(tweet);
        })
        .catch((err) => console.log(err));
      console.log(i);
      i++;
      if (i === propiedadesBooks.length) {
        clearInterval(myInterval);
      }
    }, 15000);
      
      //console.log(book);

  } catch (err) {
    console.log(err);
  }
}

//Mandamos a llamar a la funcion para correr el codigo
fetch_publishertweet();

/*
function publisherEverySoOften() {
  let i = 0;

  console.log(i);
  let myInterval = setInterval(() => {
    fetch_publishertweet(i);
    console.log(i);
    i++;
    if (i === 2) {
      clearInterval(myInterval);
    }
  }, 15000);
}

publisherEverySoOften();

//run();*/