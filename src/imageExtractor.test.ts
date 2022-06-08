const puppeteer = require('puppeteer');

describe('extractor',() => {
  let browser;
  let page;
  it('goes to the Archillect archive',async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://archillect.com/archive/');
    const loaded = await page.waitForSelector('img[class="thumb"]');
    expect(loaded).not.toBeUndefined();
    expect(loaded).not.toBeNull();
    console.log('loaded successfully');
  }, 30000);

  it('gets the number of images', async () => {
    const numberOfImages = await page.$$eval('img[class="thumb"]', (elements) => {
      return elements.length;
    });
    console.log('number of images:', numberOfImages);
  }, 30000);

  it('clicks and loads the first image page', async () => {
    await page.click('a[class="post"]');
    const loaded = await page.waitForSelector('img[id="ii"]');
    expect(loaded).not.toBeUndefined();
  }, 30000);

  it('extracts the image links', async () => {
    const imageLinks = [];
    for (let i=0; i<288; i++) {
      const image = await page.$('img[id="ii"]');
      const src = (await image.getProperty('src'))._remoteObject.value;
      expect(src).not.toBeUndefined();
      console.log('src: ', src);
      const imageLink = src.replace('66', '64');
      if (!imageLinks.includes(imageLink)) {
        imageLinks.push(imageLink);
      }
    try {
      await page.click('a[id="imgolder"]');
      const loaded = await page.waitForSelector('img[id="ii"]');
      expect(loaded).not.toBeUndefined();
    } catch (e) {
      console.log('no more images');
    }
    }
      console.log('imageLinks: ', imageLinks);
  }, 600000);

it('closes the browser', async () => {
  const closed = await browser.close();
  expect(closed).toBeUndefined();
});
});
