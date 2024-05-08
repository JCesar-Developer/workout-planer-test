import { type Page, test as base } from '@playwright/test';
import { WorkoutPage } from '@workout/pages/workout-page';
import { WorkoutCard } from '@workout/components/workout-card';
import { WorkoutForm } from '@workout/components/workout-form';
import { ToastDialog } from '@shared/components/toast-dialog';
import { ConfirmDialog } from '@shared/components/confirm-dialog';
import { WorkoutCardDetails } from './workout-crud.details';

interface WorkoutCrudFixture {
  workoutPage: WorkoutPage;
  workoutCard: WorkoutCard;
  workoutForm: WorkoutForm;
  toastDialog: ToastDialog;
  confirmDialog: ConfirmDialog;
}

let page: Page;

base.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('http://localhost:4200/workouts');
  await page.waitForLoadState('networkidle');
});

base.afterAll(async () => {
  const workoutCard = new WorkoutCard(page);
  const confirmDialog = new ConfirmDialog(page);

  if(await workoutCard.getCardByName(WorkoutCardDetails.NewCardName).isVisible()) {
    await workoutCard.deleteWorkout(WorkoutCardDetails.NewCardName);
    await confirmDialog.clickYes();
  }
  if(await workoutCard.getCardByName(WorkoutCardDetails.UpdatedCardName).isVisible()) {
    await workoutCard.deleteWorkout(WorkoutCardDetails.UpdatedCardName);
    await confirmDialog.clickYes();
  }
});

export const test = base.extend<WorkoutCrudFixture>({
  workoutPage: async ({}, use) => {
    const workoutPage = new WorkoutPage(page);
    await use(workoutPage);
  },
  workoutCard: async ({}, use) => {
    await use(new WorkoutCard(page));
  },
  workoutForm: async ({}, use) => {
    await use(new WorkoutForm(page));
  },
  toastDialog: async ({}, use) => {
    await use(new ToastDialog(page));
  },
  confirmDialog: async ({}, use) => {
    await use(new ConfirmDialog(page));
  }
});

export { expect } from '@playwright/test';