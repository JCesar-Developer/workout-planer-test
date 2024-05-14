import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { Given, When, Then } from '@decorators';

//FIXTURE ---
export const test = base.extend<{ workoutPage: WorkoutPage }>({
  workoutPage: async ({ page }, use) => {
    const workoutPage = new WorkoutPage(page);
    await workoutPage.goto();
    await use(workoutPage);
  }
})

//POM ---
export class WorkoutPage {
  //Arrangements ----
  private readonly workoutList: Locator;
  private readonly btnOpenDialog: Locator;

  constructor( private readonly page: Page ) {
    this.workoutList = page.getByTestId('workout-list');
    this.btnOpenDialog = page.getByRole('button', { name: 'Nuevo Workout' });
  }

  //Actions ---
  @Given('I am on the workouts page')
  public async goto() {
    await this.page.goto('http://localhost:4200/workouts');
  }

  @When('I open the form dialog')
  public async openFormDialog() {
    await this.btnOpenDialog.click();
  }

  //Assertion ---
  @Then('expect has card list')
  public async expectHasCardList() {
    await expect(this.workoutList).toBeVisible();
  }
  
}

