import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit(): any {
    const openInterval = setInterval(async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const puppeteer = require('puppeteer');

      const browser = await puppeteer.launch({ headless: false });

      try {
        const page = await browser.newPage();

        const closeInterval = setInterval(() => {
          browser.close();
        }, 60000);

        await page.goto(
          'https://www.fansale.it/fansale/tickets/pop-amp-rock/eurovision-song-contest/459768?language=en',
        );

        await page.waitForSelector('.EvEntryRow-Day');

        const elements = await page.$$('.EvEntryRow-Day.hidden-md');

        const dates = await Promise.all(
          elements.map((element) => element.evaluate((el) => el.textContent)),
        );

        if (dates.includes('10')) {
          await page.evaluate(() => {
            clearInterval(openInterval);
            clearInterval(closeInterval);
            alert('NOW!!!');
          });
        }
      } catch (e) {
        await browser.close();
      }
    }, 60000);
  }
}
