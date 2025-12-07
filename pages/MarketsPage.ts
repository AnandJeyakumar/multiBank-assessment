import { Locator, Page, expect } from '@playwright/test';

export class MarketsPage {

    private marketsPageHeader: Locator;


    constructor(public page: Page) {
    this.marketsPageHeader = this.page.locator("//h1");
  }

async validateMarketsPageHeaderText() {
   await expect(this.marketsPageHeader).toHaveText("Trending assets");
}




}

