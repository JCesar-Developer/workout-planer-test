import { test as base, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

export const test = base.extend<{ workoutForm: WorkoutForm }>({
  workoutForm: async ({ page }, use) => {
    const workoutForm = new WorkoutForm(page);
    await use(workoutForm);
  }
});

export class WorkoutForm {
  //Arrengements ----
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

  //Actions ---
  public async fillNameInput( text: string ) {
    await this.nameInput.click();
    await this.nameInput.fill(text);
  }

  public async fillDurationInput( number: number ) {
    await this.durationInput.click();
    await this.durationInput.fill(number.toString());
  } 

  //TODO: Provisional
  public async selectExerciseCard(id: number) {
    const exerciseCards = await this.exerciseCardsToSelect.all()
    await exerciseCards[id].click();
  }

  public async saveWorkout() {
    await this.submitButton.click();
  }

  public async fillAllSetsInputs( value: number ) {
    for( const input of await this.setsInputs.all() ) {
      await input.fill(value.toString());
    }
  }

  public async fillAllRepsInputs( value: number ) {
    for( const input of await this.repsInputs.all() ) {
      await input.fill(value.toString());
    }
  }

  public async fillAllRestsInputs( value: number ) {
    for( const input of await this.restsInputs.all() ) {
      await input.fill(value.toString());
    }
  }

  //Assertions ---
  //TODO: Se puede sacar en su propia clase
  public async dialogExists() {
    await expect(this.dialog).toBeVisible();
  }

  //TODO: Se puede sacar en su propia clase
  public async hasTitle(title: string) {
    await expect(this.dialogTitle).toHaveText(title);
  }

  public async hasNameError(errorMessage: string) {
    await expect(this.nameErrorMessage).toHaveText(errorMessage);
  }

  public async hasDurationError(errorMessage: string) {
    await expect(this.durationErrorMessage).toHaveText(errorMessage);
  }
}