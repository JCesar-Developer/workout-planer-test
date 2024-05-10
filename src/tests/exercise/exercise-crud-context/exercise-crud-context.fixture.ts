import { test as base } from '@playwright/test';
import { ExercisePage } from '@exercise/pages/exercise-page-context.pom';
import { ExerciseForm } from '@exercise/components/exercise-form.pom';
import { ExerciseCard } from '@exercise/components/exercise-card.pom';
import { ToastDialog } from '@shared/components/toast-dialog.pom';
import { ConfirmDialog } from '@shared/components/confirm-dialog.pom';
import { ExerciseCardDetails } from './exercise-crud-context.constants';

interface ExerciseCrudFixture {
  exercisePage: ExercisePage;
  exerciseForm: ExerciseForm;
  exerciseCard: ExerciseCard;
  toastDialog: ToastDialog;
  confirmDialog: ConfirmDialog;
} 

let exercisePage: ExercisePage;

base.beforeAll(async ({ browser }) => {
  exercisePage = new ExercisePage();
  await exercisePage.setCustomContext(browser);
  const page = exercisePage.page;
  
  await page.goto('http://localhost:4200/exercises');
  await page.waitForLoadState('networkidle');
});

base.afterAll(async () => {
  await deleteCard(ExerciseCardDetails.NewCardName);
  await deleteCard(ExerciseCardDetails.UpdatedCardName);
});

export const test = base.extend<ExerciseCrudFixture>({
  exercisePage: async ({}, use) => {
    await use(exercisePage);
  },
  exerciseForm: async ({}, use) => {
    await use(new ExerciseForm(exercisePage.page));
  },
  exerciseCard: async ({}, use) => {
    await use(new ExerciseCard(exercisePage.page));
  },
  toastDialog: async ({}, use) => {
    await use(new ToastDialog(exercisePage.page));
  },
  confirmDialog: async ({}, use) => {
    await use(new ConfirmDialog(exercisePage.page));
  }
});

const deleteCard = async (cardName: string): Promise<void> => {
  const exerciseCard = new ExerciseCard(exercisePage.page);
  const exerciseForm = new ExerciseForm(exercisePage.page);
  const confirmDialog = new ConfirmDialog(exercisePage.page);
  
  if(await exerciseCard.getCardsByQuery(cardName).isVisible()) {
    await exerciseCard.openEditDialog(cardName);
    await exerciseForm.deleteExercise();
    await confirmDialog.clickYes();
  }
};

export { expect } from '@playwright/test';