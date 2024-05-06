import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test"

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
  readonly toastSummary: Promise<Locator[]>
  readonly toastDetail: Promise<Locator[]>

  constructor( private readonly page: Page ) {
    this.toastSummary = this.page.locator('div.p-toast-summary').all(),
    this.toastDetail = this.page.locator('div.p-toast-detail').all()
  }

  //Assertions ---
  async ExpectShowsToastState(toastState: string): Promise<void> {
    this.toastSummary.then(async (toasts) => {
      for (const toast of toasts) {
        await expect(toast).toHaveText(toastState)
      }
    });
  }

  async ExpectShowsToastSummary(toastMessage: string): Promise<void> {
    this.toastDetail.then(async (toasts) => {
      for (const toast of toasts) {
        await expect(toast).toHaveText(toastMessage)
      }
    });
  }

}

