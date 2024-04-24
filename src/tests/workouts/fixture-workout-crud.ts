import { test as base } from '@playwright/test';
import { WorkoutPage } from '../../modules/workout/pages/workout-page';
import { WorkoutCardHandler } from '../../modules/workout/components/workout-card';
import { WorkoutForm } from '../../modules/workout/components/workout-form';
import { ToastHandler } from '../../modules/shared/components/toast-dialog';

type WorkoutPageFixture = {
  workoutPage: WorkoutPage;
  workoutCardHandler: WorkoutCardHandler;
  workoutForm: WorkoutForm;
  toastHandler: ToastHandler;
}

export const test = base.extend<WorkoutPageFixture>({
  workoutPage: async ({ page }, use) => {
    const workoutPage = new WorkoutPage(page);
    await workoutPage.goto();
    await use(workoutPage);
  },
  workoutForm: async ({ page, workoutPage }, use) => {
    const workoutForm = new WorkoutForm(page);
    await use(workoutForm);
  },
  workoutCardHandler: async ({ page, workoutPage }, use) => {
    const workoutCardHandler = new WorkoutCardHandler(page);
    await use(workoutCardHandler);
  },
  toastHandler: async ({ page }, use) => {
    const toastHandler = new ToastHandler(page);
    await use(toastHandler);
  }
})

export { expect } from '@playwright/test';