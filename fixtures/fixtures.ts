import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { MarketsPage } from '../pages/MarketsPage';
import { SpotPage } from '../pages/SpotPage';
import { AboutUsPage } from '../pages/AboutUsPage';
import { ConvertPage } from '../pages/ConvertPage';
import { Features_SpotExchange } from '../pages/Features_SpotExchange';

type Pages = {
  dashboard: DashboardPage;
  markets: MarketsPage;
  spot : SpotPage;
  aboutUs: AboutUsPage;
  convert: ConvertPage;
  feature_spotExchange: Features_SpotExchange;
};

export const test = base.extend<Pages>({
  dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto(); 
    await use(dashboard);
  },

  markets: async ({ page }, use) => {
    const markets = new MarketsPage(page);
    await use(markets);
  },
  spot: async ({ page }, use) => {
    const spot = new SpotPage(page);
    await use(spot);
  },
  aboutUs: async ({ page }, use) => {
    const aboutUs = new AboutUsPage(page);
    await use(aboutUs);
  },
  convert: async ({ page }, use) => {
    const convert = new ConvertPage(page);
    await use(convert);
  },
  feature_spotExchange: async ({ page }, use) => {
  const feature_spotExchange = new Features_SpotExchange(page);
  await use(feature_spotExchange);
},
  


});

export { expect };
