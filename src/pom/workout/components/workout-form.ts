import { expect, type Locator, type Page } from "@playwright/test";

export class WorkoutForm {

  //ARRANGEMENTS ----
  private readonly dialog: Locator;
  private readonly dialogTitle: Locator;
  private readonly nameInput: Locator;
  private readonly nameErrorMessage: Locator;
  private readonly durationInput: Locator;
  private readonly durationErrorMessage: Locator;
  private readonly submitButton: Locator;
  private readonly setsInputs: Locator;
  private readonly repsInputs: Locator;
  private readonly restsInputs: Locator;

  //TODO: Provisional
  private readonly exerciseCardsToSelect: Locator;

  constructor( private readonly page: Page ) {
    this.dialog = page.getByRole('dialog');
    this.dialogTitle = page.locator('span.p-dialog-title');
    this.nameInput = page.getByRole('textbox', { name: 'Nombre de la rutina *' });
    this.nameErrorMessage = page.getByTestId('name-error-message');
    this.durationInput = page.getByRole('textbox', { name: 'Duración *' });
    this.durationErrorMessage = page.getByTestId('duration-error-message');
    this.submitButton = page.locator('button[type="submit"]');
    this.setsInputs = page.getByRole('textbox', { name: 'Series' });
    this.repsInputs = page.getByRole('textbox', { name: 'Reps' });
    this.restsInputs = page.getByRole('textbox', { name: 'Desc' });

    //TODO: Provisional
    this.exerciseCardsToSelect = page.getByRole('dialog').locator('exercise-card');
  }

  //ACTIONS ---
  async fillNameInput( text: string ) {
    await this.nameInput.click();
    await this.nameInput.fill(text);
  }

  async fillDurationInput( number: number ) {
    await this.durationInput.click();
    await this.durationInput.fill(number.toString());
  } 

  //TODO: Provisional
  async selectExerciseCard(id: number) {
    const exerciseCards = await this.exerciseCardsToSelect.all()
    await exerciseCards[id].click();
  }

  async saveWorkout() {
    await this.submitButton.click();
  }

  async fillAllSetsInputs( value: number ) {
    for( const input of await this.setsInputs.all() ) {
      await input.fill(value.toString());
    }
  }

  async fillAllRepsInputs( value: number ) {
    for( const input of await this.repsInputs.all() ) {
      await input.fill(value.toString());
    }
  }

  async fillAllRestsInputs( value: number ) {
    for( const input of await this.restsInputs.all() ) {
      await input.fill(value.toString());
    }
  }

  //ASSERTIONS ---
  //TODO: Se puede sacar en su propia clase
  async dialogExists() {
    await expect(this.dialog).toBeVisible();
  }

  //TODO: Se puede sacar en su propia clase
  async hasTitle(title: string) {
    await expect(this.dialogTitle).toHaveText(title);
  }

  async hasNameError(errorMessage: string) {
    await expect(this.nameErrorMessage).toHaveText(errorMessage);
  }

  async hasDurationError(errorMessage: string) {
    await expect(this.durationErrorMessage).toHaveText(errorMessage);
  }

}