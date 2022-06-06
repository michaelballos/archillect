const puppeteer = require('puppeteer');

module.exports = (async () => {
  try {
    console.log('launching browser...');
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    await page.click('img.thumb[src]').then(async (element) => {
      const src = await element.getAttribute('src');
      console.log('LINK:',src);
    }
    );
    await browser.close();
  } catch (e) {
    console.log(e, 'Page did not load');
  }
})();
