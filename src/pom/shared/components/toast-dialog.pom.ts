import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test"

export enum ToastSummary {
  Success = 'Success',
  Error = 'Error',
  Info = 'Info',
  Warn = 'Warn'
}

//FIXTURE ---
export const test = base.extend<{ toastDialog: ToastDialog }>({
  toastDialog: async ({ page }, use) => {
    const toastDialog = new ToastDialog(page);
    await use(toastDialog);
  }
});

//POM ---
export class ToastDialog {
  //Arrangements ---
  readonly toastSummary: Locator;
  readonly toastDetail: Locator;

  constructor( private readonly page: Page ) {
    this.toastSummary = this.page.locator('div.p-toast-summary');
    this.toastDetail = this.page.locator('div.p-toast-detail');
  }

  //Assertions ---
  async expectSummaryBe(toastState: string): Promise<void> {
    await this.toastSummary.all().then(async (summaries) => {
      const headers = await Promise.all(summaries.map(summary => summary.textContent()));
      const found = headers.some(header => toastState === header);
      expect(found).toBeTruthy();
    });
  }

  async expectDetailBe(toastMessage: string): Promise<void> {
    await this.toastDetail.all().then(async (details) => {
      const contents = await Promise.all(details.map(toast => toast.textContent()));
      const found = contents.some(content => toastMessage === content);
      expect(found).toBeTruthy();
    });
  }

}

