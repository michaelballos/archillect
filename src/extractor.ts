const puppeteer = require('puppeteer');

module.exports = (async () => {
  try {
    console.log('launching browser...');
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    await page.click('img.thumb[src]');
    await page.$eval('img[id=ii]', img => {
      const link = img.getAttribute('src');
      console.log('LINK:',link);
    });
    await browser.close();
  } catch (e) {
    console.log(e, 'Page did not load');
  }
})();
