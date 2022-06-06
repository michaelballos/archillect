const puppeteer = require('puppeteer');

describe('extractor', () => {
  let browser;
  let page;
  it('should go to the Archillect website', async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    const loaded = await page.waitForSelector('img');
      expect(loaded).not.toBeUndefined();
      console.log('loaded successfully');
      await browser.close();
  });

  it('should extract the image src links', async () => {
    console.log('finding images...');
    const imageLinks = await page.evaluate(() => {
        const links = Array.from(page.$$('img.thumb[src]')
        .map((element) => {
          return element.getAttribute('src');
        }));
        expect(links).toBe(links.length > 0);
    });
      expect(imageLinks).not.toBeUndefined();
  });
});
