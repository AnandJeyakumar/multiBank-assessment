import { Locator, Page, expect } from '@playwright/test';
import {pageTitles ,spotData ,urlEndpoint} from '../testData';
import { expectPageToMatchEndpoint } from '../utils/reusableActions'

export class SpotPage {

    private tradePair: Locator;
    private tradeCurrentPrice : Locator;
    private assertInfo : Locator;
    private tradingPairs : Locator;


    constructor(public page: Page) {
    this.tradePair = this.page.locator("#trade-pair");
    this.tradeCurrentPrice = this.page.locator("#trade-current-price");
    this.assertInfo = this.page.locator("div[class*='style_asset']");
    this.tradingPairs =  this.page.locator("span[id*='pair-name']");
  }

async validateTradePair() {
    console.log("The Trade Pair Text is",await this.tradePair.textContent());
   await expect(this.tradePair).toHaveText(spotData.tradeAssets);
}

async validateSpotPageContent()
{
    console.log("The current price is " , await this.tradeCurrentPrice.textContent());
    const rawPrice = await this.tradeCurrentPrice.textContent();  
    const formattedPrice = parseFloat(rawPrice!.replace(/,/g, '')).toString();  
    console.log("The formattedPrice  is " , formattedPrice);
    const expectedTitleTemplate = pageTitles.Title.SpotTradePage;
    const expectedTitle = expectedTitleTemplate.replace("CurrentPrice", formattedPrice);
    await expect(this.page).toHaveTitle(expectedTitle);
    await expectPageToMatchEndpoint(this.page, urlEndpoint.spotTrade);

}

async validatePairs(expectedPairs: string[])
{
  await this.assertInfo.click();
  const count = await this.tradingPairs.count();
  const foundPairs: string[] = [];
  for (let i = 0; i < count; i++) {
    const text = await this.tradingPairs.nth(i).innerText();
    foundPairs.push(text.trim());
  }
  for (const expected of expectedPairs) {
    expect(foundPairs).toContain(expected);
  }
}


}

