const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6224834180:AAHEBS4E6TtB4_SytKjihUThzwAMQvndSvQ');

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://csgo500.com/rewards';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    console.log($.html());
    return waitForElement($, '.sidebar-background');
  })
  .then(sidebar => {
    // Do something with the sidebar element here
    console.log(sidebar.html());
  })
  .catch(error => {
    console.error(error);
  });

function waitForElement($, selector) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const element = $(selector);
      if (element.length && element.hasClass('sidebar-background')) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  });
}