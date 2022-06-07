const puppeteer = require('puppeteer');

module.exports = (async () => {
  try {
    console.log('launching browser...');
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    await page.$$('img.thumb[src]').then(async (imagePreviews) => {
      const urls = imagePreviews.map(async (img) => {
        await img.click();
        await page.waitForSelector('#ii');
        const url = await page.$eval('img[src="ii"]', (el) => el.src);
      });
      const result = await Promise.all(urls);
    });
    await page.waitForSelector('#ii');
    await page.$$eval('img[id="ii"]', (images) => {
      images.map((image) => {
        console.log('src:', image.src);
      });
    });
    await browser.close();
  } catch (e) {
    console.log(e, 'Page did not load');
  }
})();
