import { Page, expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { menuData, Title ,urlEndpoint ,spotData } from '../testData';
import { expectPageToMatchEndpoint , validateElementText } from '../utils/reusableActions'

test.describe('Assessment', () => {

  test('TC01 - Checking Menu and Sub Menu Items Visiblity', async ({ dashboard }) => {
    await dashboard.validateTopMenuItems(menuData.menu);
    await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
    await dashboard.validateSubMenuItems(menuData.tradeSubMenuItem);
    await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
    await dashboard.clickOnMenuWithDropDownByText(menuData.featureMenu);
    await dashboard.validateSubMenuItems(menuData.featureMenuSubItems);
    await dashboard.clickOnMenuWithDropDownByText(menuData.featureMenu);
    await dashboard.clickOnMenuWithDropDownByText(menuData.aboutUsMenu);
    await dashboard.validateSubMenuItems(menuData.aboutUsMenuSubItems);
    await dashboard.clickOnMenuWithDropDownByText(menuData.aboutUsMenu);
    await dashboard.clickOnMenuWithDropDownByText(menuData.supportMenu);
    await dashboard.validateSubMenuItems(menuData.supportMenuSubItems);
  });

  test('TC02 - Navigation items should redirect correctly', async ({ dashboard ,markets,spot,convert , feature_spotExchange }) => {
   
    await dashboard.clickOnMenuWithoutDropDownByText(menuData.dashboardMenu);
    await expect(dashboard.page).toHaveURL(urlEndpoint.dashboard);  
    await expect(dashboard.page).toHaveTitle(Title.HomePage);

    await dashboard.clickOnMenuWithoutDropDownByText(menuData.marketMenu);
    await expectPageToMatchEndpoint(dashboard.page, urlEndpoint.markets);
    await expect(markets.page).toHaveTitle(Title.MarketsPage);
    await markets.validateMarketsPageHeaderText();


    await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
    await dashboard.clickOnSubMenuItemByText(menuData.spotSubMenu);
    await spot.validateTradePair(); 

    await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
    await dashboard.clickOnSubMenuItemByText(menuData.instantBuySubMenu);
    await dashboard.validateInstantBuyHeader();
    
    await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
    await dashboard.clickOnSubMenuItemByText(menuData.panicSellSubMenu);
    await dashboard.validatePanicSellHeader();

    await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
    await dashboard.clickOnSubMenuItemByText(menuData.convertSubMenu);
    await convert.validateConvertPageHeaderText();
    await expectPageToMatchEndpoint(convert.page, urlEndpoint.convert);
    await expect(convert.page).toHaveTitle(Title.ConvertPage);
    
    await dashboard.clickOnMenuWithDropDownByText(menuData.featureMenu);
    await dashboard.clickOnSubMenuItemByText(menuData.spotExchangeSubMenu);
    await feature_spotExchange.validateSpotExchangePageHeaderText(); 



  });


  test('TC03 Trade > Spot opens with correct default pair', async ({ dashboard , spot }) => {
  await dashboard.clickOnMenuWithDropDownByText(menuData.tradeMenu);
  await dashboard.clickOnSubMenuItemByText(menuData.spotSubMenu);
  await spot.validateTradePair();
  await spot.validateSpotPageContent();
  await spot.validatePairs(spotData.tradingPairs);
});


test('TC04 Validate marketing banner and download links', async ({ dashboard  }) => {
  await dashboard.validateMarketingBannerVisible();
  await dashboard.validateDownloadLinks();

});

test('TC05 Validate About Us Page', async ({ dashboard , aboutUs }) => {
  await dashboard.clickOnMenuWithDropDownByText(menuData.aboutUsMenu);
  await dashboard.clickOnSubMenuItemByText(menuData.whyMultiBankSubMenu);
  // await aboutUs.validateAboutUsPageContent();  Need to confirm the behaviour

});

});
