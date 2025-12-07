import { Locator, Page, expect } from '@playwright/test';
import { menuData, Title ,urlEndpoint ,spotData, headers } from '../testData';

export class Features_SpotExchange {

    private spotExchangeHeader: Locator;


    constructor(public page: Page) {
    this.spotExchangeHeader = this.page.locator("//h1");
  }

async validateSpotExchangePageHeaderText() {
   await expect(this.spotExchangeHeader).toHaveText(headers.spotExchangeHeader);
}




}

