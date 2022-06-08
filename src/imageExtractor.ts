const puppeteer = require('puppeteer');

module.exports = (async () => {
  try {
    console.log('launching browser...');
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    await page.waitForSelector('img[class="thumb"]');
    console.log('loaded archillect successfully');
    const numberOfImages = await page.$$eval('img[class="thumb"]', (elements) => {
      return elements.length;
    });
    await page.click('a[class="post"]');
    await page.waitForSelector('img[id="ii"]');
    const imageLinks = [];
    console.log('scraping images...');
    for (let i=0; i<numberOfImages; i++) {
      const image = await page.$('img[id="ii"]');
      const src = (await image.getProperty('src'))._remoteObject.value;
      console.log('src: ', src);
      const imageLink = src.replace('66', '64');
      if (!imageLinks.includes(imageLink)) {
        imageLinks.push(imageLink);
      }
      try {
      await page.click('a[id="imgolder"]');
      await page.waitForSelector('img[id="ii"]');
      } catch (e) {
        console.log('no more images');
      }
    }
    console.log('LINKS SCRAPED:', imageLinks);
    await browser.close();
  } catch (e) {
    console.log(e, 'Page did not load');
  }
})();
