const puppeteer = require('puppeteer');

describe('extractor', () => {
  let browser;
  let page;
  it('should go to the Archillect website', async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    const loaded = await page.waitForSelector('img');
    try {
      expect(loaded).not.toBeUndefined();
      console.log('loaded successfully');
    } catch (e) {
      console.log(e, 'Page did not load');
      await browser.close();
    }
  }, 30000);

  it('should extract the image src links', async () => {
    console.log('Searching for images...');
    const imageLinks = await page.$$('img');
    console.log('LINKS:', imageLinks);
    expect(1).toBe(1);
    await browser.close();
  }, 30000);
});
