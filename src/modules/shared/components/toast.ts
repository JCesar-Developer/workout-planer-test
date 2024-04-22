import { expect, type Locator, type Page } from "@playwright/test"

export class ToastHandler {

  //ARRANGEMENTS ---
  private readonly toastSummary: Locator
  private readonly toastDetail: Locator

  constructor( private readonly page: Page ) {
    this.toastSummary = this.page.locator('div.p-toast-summary'),
    this.toastDetail = this.page.locator('div.p-toast-detail')
  }

  //ASSERTIONS ---
  async showsToastMessage(toastState: string, toastMessage: string): Promise<void> {
    await expect(this.toastSummary).toHaveText(toastState)
    await expect(this.toastDetail).toHaveText(toastMessage)
  }

}

