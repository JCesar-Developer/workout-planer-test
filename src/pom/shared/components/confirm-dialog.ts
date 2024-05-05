import { expect, type Locator, type Page } from "@playwright/test"

export class ConfirmDialog {

  //ARRANGEMENTS ---
  private readonly content: Locator;
  private readonly buttonNo: Locator;
  private readonly buttonYes: Locator;

  constructor( private readonly page: Page ) {
    this.content = this.page.locator('div.p-confirm-popup-content');
    this.buttonNo = this.page.getByRole('button', { name: 'No' });
    this.buttonYes = this.page.getByRole('button', { name: 'Yes' });
  }

  //ACTIONS ---
  async clickNo(): Promise<void> {
    await this.buttonNo.click();
  }

  async clickYes(): Promise<void> {
    await this.buttonYes.click();
  }

  //ASSERTIONS ---
  async showsContent(content: string): Promise<void> {
    await expect(this.content).toHaveText(content);
  }
  
}

