import { expect, type Locator, type Page } from "@playwright/test"

export class ToastDialogHandler {

  //ARRANGEMENTS ---
  private readonly toastSummary: Promise<Locator[]>
  private readonly toastDetail: Promise<Locator[]>

  constructor( private readonly page: Page ) {
    this.toastSummary = this.page.locator('div.p-toast-summary').all(),
    this.toastDetail = this.page.locator('div.p-toast-detail').all()
  }

  //ASSERTIONS ---
  async showsToastState(toastState: string): Promise<void> {
    this.toastSummary.then(async (toasts) => {
      for (const toast of toasts) {
        await expect(toast).toHaveText(toastState)
      }
    });
  }

  async showsToastSummary(toastMessage: string): Promise<void> {
    this.toastDetail.then(async (toasts) => {
      for (const toast of toasts) {
        await expect(toast).toHaveText(toastMessage)
      }
    });
  }

}

