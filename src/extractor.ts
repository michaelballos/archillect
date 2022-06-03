const puppeteer = require('puppeteer');

module.exports = (async () => {
  console.log('launching browser...');
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  try {
    await page.goto('https://archillect.com/archive/');
    const loaded = await page.waitForSelector('body');
    console.log('loaded successfully');
    return loaded;
  } catch (e) {
    console.log(e, 'Page did not load');
  }
  const imageLinks = await page.$$('img[src]');
  console.log('LINKS FOUND:', imageLinks);
  await browser.close();
})();
