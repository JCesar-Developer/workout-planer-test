import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test"

//FIXTURE ---
export const test = base.extend<{ confirmDialog: ConfirmDialog }>({
  confirmDialog: async ({ page }, use) => {
    const confirmDialog = new ConfirmDialog(page);
    await use(confirmDialog);
  }
});

//POM ---
export class ConfirmDialog {
  //Arrangements ---
  private readonly content: Locator;
  private readonly buttonNo: Locator;
  private readonly buttonYes: Locator;

  constructor( private readonly page: Page ) {
    this.content = this.page.locator('div.p-confirm-popup-content');
    this.buttonNo = this.page.getByRole('button', { name: 'No' });
    this.buttonYes = this.page.getByRole('button', { name: 'Yes' });
  }

  //Actions ---
  async clickNo(): Promise<void> {
    await this.buttonNo.click();
  }

  async clickYes(): Promise<void> {
    await this.buttonYes.click();
  }

  //ASSERTIONS ---
  async ExpectShowsContent(content: string): Promise<void> {
    await expect(this.content).toHaveText(content);
  }
  
}

