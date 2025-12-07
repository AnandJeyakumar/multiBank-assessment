import { expect, Page ,Locator  } from '@playwright/test';

export async function expectPageToMatchEndpoint(page: Page, endpoint: string) {
  const regex = new RegExp(`${endpoint}$`);
  await expect(page).toHaveURL(regex);
}

export function cleanUnicode(str: string): string {
  return str.replace(/\u200E/g, '').trim();
}

export const validateListOfTexts = async (
    locator: Locator,
    expectedArray: string[]
) => {
    for (let i = 0; i < expectedArray.length; i++) {
        await expect(locator.nth(i)).toHaveText(expectedArray[i]);
    }
}

export async function validateElementText(element:Locator ,text:string) {
    await expect(element).toHaveText(text);
}