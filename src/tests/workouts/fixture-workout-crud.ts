import { test as base } from '@playwright/test';
import { WorkoutPage } from '../../pom/workout/pages/workout-page';
import { WorkoutCardHandler } from '../../pom/workout/components/workout-card';
import { WorkoutForm } from '../../pom/workout/components/workout-form';
import { ToastDialogHandler } from '../../pom/shared/components/toast-dialog';
import { ConfirmDialog } from '../../pom/shared/components/confirm-dialog';

type WorkoutPageFixture = {
  workoutPage: WorkoutPage;
  workoutCardHandler: WorkoutCardHandler;
  workoutForm: WorkoutForm;
  toastHandler: ToastDialogHandler;
  confirmDialog: ConfirmDialog;
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
    const toastHandler = new ToastDialogHandler(page);
    await use(toastHandler);
  },
  confirmDialog: async ({ page }, use) => {
    const confirmDialog = new ConfirmDialog(page);
    await use(confirmDialog);
  }
})

export { expect } from '@playwright/test';