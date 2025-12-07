import { Locator, Page, expect } from '@playwright/test';
import headerData from '../testData/headers.json';
import  { validateListOfTexts , expectPageToMatchEndpoint }  from '../utils/reusableActions'
import { Title ,urlEndpoint  } from '../testData';


export class AboutUsPage {

    private pageHeader: Locator;
    private pageHeaderDescription : Locator;
    private whiteTextContent : Locator;

    constructor(public page: Page) {
    this.pageHeader = this.page.locator("//h2[contains(@class,'bannerSlide')]");
    this.pageHeaderDescription =  this.page.locator("//p[contains(@class,'bannerSlide')]");
    this.whiteTextContent = this.page.locator("h2[class*='text-white']");
  }



async validateAboutUsPageContent()
{
    await expect(this.page).toHaveTitle(Title.AboutUsPage)
    await expectPageToMatchEndpoint(this.page , urlEndpoint.aboutUs)
    await this.pageHeader.first().waitFor();
    await validateListOfTexts(this.pageHeader, headerData.aboutUsHeaders);
    await validateListOfTexts(this.pageHeaderDescription, headerData.aboutUsHeaderDescription);
    await this.whiteTextContent.first().waitFor();
    await validateListOfTexts(this.whiteTextContent, headerData.whiteHeadingInAboutUsPage);
    
}
}

