import { expect, test as base } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

//FIXTURE ---
export const test = base.extend<{exerciseForm: ExerciseForm}>({
  exerciseForm: async ({ page }, use) => {
    const exerciseForm = new ExerciseForm(page);
    await use(exerciseForm);
  }
});

//POM ---
export class ExerciseForm {
  //Arrangements ---
  readonly closeBtn: Locator;
  readonly deleteBtn: Locator;
  readonly dialog: Locator;
  readonly dialogTitle: Locator;
  readonly errorMessage: Locator;
  readonly exerciseNameInput: Locator;
  readonly saveBtn: Locator;

  constructor( private readonly page: Page ) {
    this.closeBtn = this.page.getByTestId('close-button'),
    this.deleteBtn = this.page.getByTestId('delete-button'),
    this.dialog = this.page.locator('div[role="dialog"]'),
    this.dialogTitle = this.page.locator('span.p-dialog-title'),
    this.errorMessage = this.page.getByTestId('error-message'),
    this.exerciseNameInput = this.page.getByPlaceholder('Nombre del ejercicio'),
    this.saveBtn = this.page.locator('button[type="submit"]')
  }

  //Actions ---
  async fillExerciseName( text: string ): Promise<void> {
    await this.exerciseNameInput.click();
    await this.exerciseNameInput.fill(text);
  }

  async closeDialog(): Promise<void> {
    await this.closeBtn.click();
  }

  async saveExercise(): Promise<void> {
    await this.saveBtn.click();
  }

  async deleteExercise(): Promise<void> {
    await this.deleteBtn.click();
  }

  //Assertions ---
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