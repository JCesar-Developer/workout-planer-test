import { expect, type Locator, type Page } from "@playwright/test";

export class ExerciseForm {

  //ARRANGEMENTS ---
  private readonly closeBtn: Locator;
  private readonly deleteBtn: Locator;
  private readonly dialog: Locator;
  private readonly dialogTitle: Locator;
  private readonly errorMessage: Locator;
  private readonly exerciseNameInput: Locator;
  private readonly saveBtn: Locator;

  constructor( private readonly page: Page ) {
    this.closeBtn = this.page.getByTestId('close-button'),
    this.deleteBtn = this.page.getByTestId('delete-button'),
    this.dialog = this.page.locator('div[role="dialog"]'),
    this.dialogTitle = this.page.locator('span.p-dialog-title'),
    this.errorMessage = this.page.getByTestId('error-message'),
    this.exerciseNameInput = this.page.getByPlaceholder('Nombre del ejercicio'),
    this.saveBtn = this.page.locator('button[type="submit"]')
  }

  //TODO: Faltan los casos de uso: Cambiar categoria del ejercicio y cambiar imagen del ejercicio.
  //ACTIONS ---
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