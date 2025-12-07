import { Locator, Page, expect } from '@playwright/test';
import { menuData, Title ,urlEndpoint ,spotData } from '../testData';

export class ConvertPage {

    private convertPageHeader: Locator;


    constructor(public page: Page) {
    this.convertPageHeader = this.page.locator("//h3");
  }

async validateConvertPageHeaderText() {
   await expect(this.convertPageHeader).toHaveText(menuData.convertSubMenu);
}




}

