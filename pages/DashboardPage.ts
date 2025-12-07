import { Locator, Page, expect } from '@playwright/test';
import { cleanUnicode ,validateElementText  } from '../utils/reusableActions'
import { Title ,urlEndpoint , menuData , headers  } from '../testData';

export class DashboardPage {

    private intialMenuWithoutDropdownoption: Locator;
    private menuItemWithDropDown : Locator;
    private subMenuItems : Locator;
    private marketingBanner : Locator;
    private appStoreLink : Locator;
    private playStoreLink : Locator;
    private instantBuyHeader: Locator;
    private xIcon : Locator;
    private whatIsPopUpHeader : Locator;
    private popoverPanel : Locator;

    constructor(public page: Page) {
    this.intialMenuWithoutDropdownoption = this.page.locator("div[class*='style_menu-container'] a");
    this.menuItemWithDropDown = this.page.locator("span[class*='style_menu-item'] > div");
    this.subMenuItems =  this.page.locator("//div[contains(@class,'style_popover-panel')]//a//div[contains(@class,'style_text')]");
    this.marketingBanner =  this.page.locator("//h1[contains(text(),'Investment Opportunities')]//following::div[contains(@class,'style_banner-container')]")
    this.appStoreLink = this.page.locator("//a[contains(@href,'https://apps.apple.com/ae/app/')]");
    this.playStoreLink = this.page.locator("//a[contains(@href,'https://play.google.com/')]");
    this.instantBuyHeader = this.page.locator(".flex-grow");
    this.xIcon = this.page.locator("#walkthrough-modal-dialog-close-button");
    this.whatIsPopUpHeader = this.page.locator("h2[class*='text-center']")
    this.popoverPanel = this.page.locator("[class*='style_popover-panel']")



  }

async goto() {
  await this.page.goto('/');
  await expect(this.page).toHaveTitle("MultiBank.io - Home");
  await this.page.keyboard.press('Control+-');


}

async clickOnMenuWithoutDropDownByText(menuItem: string) {
    console.log("Inside clickOnMenuWithoutDropDownByText" ,menuItem )
  const menu = this.intialMenuWithoutDropdownoption.getByText(menuItem);
  await menu.click();
}


async clickOnMenuWithDropDownByText(menuItem: string) {
  console.log("Inside clickOnMenuWithDropDownByText" ,menuItem )
  const menu = this.menuItemWithDropDown.getByText(menuItem);
  await menu.click();
}


  async validateTopMenuItems(menuItems: string[]) {
    // First 2: Dashboard, Markets
    for (let i = 0; i < 2; i++) {
      const element = this.intialMenuWithoutDropdownoption.nth(i);
      console.log(`Checking non-dropdown menu item ${i}: "${menuItems[i]}"`);
      await expect(element).toHaveText(menuItems[i]);
    }
    // Next 4: Trade
    const dropdownCount = await this.menuItemWithDropDown.count();
    console.log("dropdownCount is ", dropdownCount);
    for (let j = 0; j < dropdownCount; j++) {
      const element = this.menuItemWithDropDown.nth(j);
      const expectedText = menuItems[j + 2]; // +2 to skip Dashboard/Markets
      console.log(`Checking dropdown menu item ${j + 2}: "${expectedText}"`);
      await expect(element).toHaveText(expectedText);
    }
  }

async validateSubMenuItems(expectedItems: string[]) {
  await this.subMenuItems.first().waitFor({ state: 'visible'});
  const count = await this.subMenuItems.count();
  console.log("The Submenu count is",count)
  const actualTexts: string[] = [];
  for (let i = 0; i < count; i++) {
    const text = await this.subMenuItems.nth(i).textContent();
    if (text) {
      actualTexts.push(text.trim());
    }
  }
  for (const expected of expectedItems) {
    const found = actualTexts.some(actual => actual.includes(expected));
    console.log(`Checking if submenu contains: "${expected}" → ${found ? 'Yes' : 'No'}`);
    expect(found).toBeTruthy();
  }
}



async clickOnSubMenuItemByText(text: string)
{
  await this.subMenuItems.getByText(text).click()
}


async validateMarketingBannerVisible()
{
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); 
    await expect(this.marketingBanner).toHaveCount(2);
    await expect(this.marketingBanner.nth(0)).toBeVisible()
    await expect(this.marketingBanner.nth(1)).toBeVisible()
}

async validateDownloadLinks() {
  await expect(this.appStoreLink).toBeVisible();
  const [appStorePage] = await Promise.all([
    this.page.context().waitForEvent('page'),   
    this.appStoreLink.click(),                
  ]);
  await appStorePage.waitForLoadState("domcontentloaded")
  await expect(appStorePage).toHaveURL(urlEndpoint.appStoreURL);
  const normalized =   cleanUnicode(await appStorePage.title())
  await expect(normalized).toBe(Title.AppStorePage);
  await appStorePage.close();
  await this.page.bringToFront();
  await expect(this.playStoreLink).toBeVisible();
   const [playStorePage] = await Promise.all([
    this.page.context().waitForEvent('page'),   
    this.playStoreLink.click(),                
  ]);
  await playStorePage.waitForLoadState("domcontentloaded")
  await expect(playStorePage).toHaveURL(urlEndpoint.playStoreURL);
  await expect(playStorePage).toHaveTitle(Title.PlaystorePage);
  await playStorePage.close();

}

async validateInstantBuyHeader()
{
  await validateElementText(this.whatIsPopUpHeader , headers.whatIsInstantBuyHeader );
  await this.xIcon.click();
}

async validatePanicSellHeader()
{
  await validateElementText(this.whatIsPopUpHeader , headers.whatIsPanicSellHeader );
  await this.xIcon.click();
}




}

