import { expect, type Locator, type Page } from "@playwright/test";

export class ExerciseForm {

  //ARRANGEMENTS ---
  private readonly dialog: Locator;
  private readonly dialogTitle: Locator;
  private readonly exerciseNameInput: Locator;
  private readonly errorMessage: Locator;
  private readonly saveBtn: Locator;
  private readonly closeBtn: Locator;
  private readonly deleteBtn: Locator;

  constructor( private readonly page: Page ) {
    this.page = page,
    this.dialog = page.locator('div[role="dialog"]'),
    this.dialogTitle = page.locator('span.p-dialog-title'),
    this.exerciseNameInput = page.getByPlaceholder('Nombre del ejercicio'),
    this.errorMessage = page.getByTestId('error-message'),
    this.saveBtn = page.locator('button[type="submit"]'),
    this.closeBtn = page.getByTestId('close-button'),
    this.deleteBtn = page.getByTestId('delete-button')
  }

  //ACTIONS ---
  async saveExercise(): Promise<void> {
    await this.saveBtn.click();
  }

  async closeDialog(): Promise<void> {
    await this.closeBtn.click();
  }

  async deleteExercise(): Promise<void> {
    await this.deleteBtn.click();
  }

  async fillExerciseName( text: string ): Promise<void> {
    await this.exerciseNameInput.click();
    await this.exerciseNameInput.fill(text);
  }

  //ASSERTIONS ---
  async dialogExists(): Promise<void> {
    await expect(this.dialog).toBeVisible();
  }

  async hasTitle(title: string): Promise<void> {
    await expect(this.dialogTitle).toHaveText(title);
  }

  async hasError(errorMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(errorMessage);
  }

}