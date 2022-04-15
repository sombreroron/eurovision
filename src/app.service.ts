import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  openInterval;

  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    this.openInterval = setInterval(async () => {

      try {
        await page.goto(
          'https://www.fansale.it/fansale/tickets/pop-amp-rock/eurovision-song-contest/459768?language=en',
        );

        await page.waitForSelector('.EvEntryRow-Day');


        const elements = await page.$$('.EvEntryRow-Day.hidden-md');

        const dates = await Promise.all(
          elements.map((element) => element.evaluate((el) => el.textContent)),
        );

        if (dates.includes('14')) {
          await clearInterval(this.openInterval);
          await page.goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
      } catch (e) {
      }
    }, 6000);
  }
}
