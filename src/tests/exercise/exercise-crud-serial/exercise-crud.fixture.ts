import { type Page, test as base } from '@playwright/test';
import { ExercisePage } from '@exercise/pages/exercise-page';
import { ExerciseForm } from '@exercise/components/exercise-form';
import { ExerciseCard } from '@exercise/components/exercise-card';
import { ToastDialog } from '@shared/components/toast-dialog';
import { ConfirmDialog } from '@shared/components/confirm-dialog';
import { ExerciseCardDetails } from './exercise-crud.details';

interface ExerciseCrudFixture {
  exercisePage: ExercisePage;
  exerciseForm: ExerciseForm;
  exerciseCard: ExerciseCard;
  toastDialog: ToastDialog;
  confirmDialog: ConfirmDialog;
} 

let page: Page;

base.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('http://localhost:4200/exercises');
  await page.waitForLoadState('networkidle');
});

base.afterAll(async () => {
  const exerciseCard = new ExerciseCard(page);
  const exerciseForm = new ExerciseForm(page);
  const confirmDialog = new ConfirmDialog(page);

  if(await exerciseCard.getCardsByQuery(ExerciseCardDetails.NewCardName).isVisible()) {
    await exerciseCard.openEditDialog(ExerciseCardDetails.NewCardName);
    await exerciseForm.deleteExercise();
    await confirmDialog.clickYes();
  }
  if(await exerciseCard.getCardsByQuery(ExerciseCardDetails.UpdatedCardName).isVisible()) {
    await exerciseCard.openEditDialog(ExerciseCardDetails.UpdatedCardName);
    await exerciseForm.deleteExercise();
    await confirmDialog.clickYes();
  }
});

export const test = base.extend<ExerciseCrudFixture>({
  exercisePage: async ({}, use) => {
    const exercisePage = new ExercisePage(page);
    await use(exercisePage);
  },
  exerciseForm: async ({}, use) => {
    await use(new ExerciseForm(page));
  },
  exerciseCard: async ({}, use) => {
    await use(new ExerciseCard(page));
  },
  toastDialog: async ({}, use) => {
    await use(new ToastDialog(page));
  },
  confirmDialog: async ({}, use) => {
    await use(new ConfirmDialog(page));
  }
});


export { expect } from '@playwright/test';