import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

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
  private readonly openCreateWorkoutButton: Locator;

  constructor( private readonly page: Page ) {
    this.workoutList = page.getByTestId('workout-list');
    this.openCreateWorkoutButton = page.getByRole('button', { name: 'Nuevo Workout' });
  }

  //Actions ---
  async goto() {
    await this.page.goto('http://localhost:4200/workouts');
  }

  async openCreateWorkoutDialog() {
    await this.openCreateWorkoutButton.click();
  }

  //Assertion ---
  async hasWorkoutCardList() {
    await this.workoutList.isVisible();
  }
  
}

