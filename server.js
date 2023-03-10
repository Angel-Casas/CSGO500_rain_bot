const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6224834180:AAHEBS4E6TtB4_SytKjihUThzwAMQvndSvQ');

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://csgo500.com/rewards';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const isActive = $('.rain-box-container').hasClass('is-active');
    console.log(isActive);
  })
  .catch(error => {
    console.log(error);
  });

function checkRemoteWebsite() {
  puppeteer.launch()
    .then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://csgo500.com/rewards');
        await page.waitForSelector('.rain-box-container.is-active');
        const element = await page.$('.rain-box-container.is-active');
        if (element) {
            bot.sendMessage(chatId, 'It is raining!');
        } else {
            setTimeout(checkRemoteWebsite, 1000);
        }
        await browser.close();
    })
    .catch(error => {
      setTimeout(checkRemoteWebsite, 1000);
    });
}

// checkRemoteWebsite();
