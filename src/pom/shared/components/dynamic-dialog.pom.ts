import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

//FIXTURE ---
export const test = base.extend<{ dynamicDialog: DynamicDialog }>({
  dynamicDialog: async ({ page }, use) => {
    const dynamicDialog = new DynamicDialog(page);
    await use(dynamicDialog);
  }
});

//POM ---
export class DynamicDialog {
  //Arrangements ---
  private readonly dialog: Locator;
  private readonly dialogTitle: Locator;
  private readonly xButton: Locator;

  constructor( private readonly page: Page ) {
    this.dialog = this.page.locator('div.p-dynamic-dialog');
    this.dialogTitle = this.page.locator('span.p-dialog-title');
    this.xButton = this.page.locator('button.p-dialog-header-icon');
  }

  //Actions ---
  public async clickClose(): Promise<void> {
    await this.xButton.click();
  }

  //ASSERTIONS ---
  public async expectDialogIsVisible(content: string): Promise<void> {
    await expect(this.dialog).toHaveText(content);
  }

  public async expectHasTitle(title: string): Promise<void> {
    await expect(this.dialogTitle).toHaveText(title);
  }
}