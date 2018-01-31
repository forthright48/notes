# Puppeteer

```
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: false,
});
const page = await browser.newPage();

await page.goto(`http://www.lightoj.com/login_main.php`, {waitUntil: 'networkidle2'});

await page.waitFor(100000);
await browser.close();
```
