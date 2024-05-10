import { type Page, test as base } from '@playwright/test';
import { ExercisePage } from '@exercise/pages/exercise-page.pom';
import { ExerciseForm } from '@exercise/components/exercise-form.pom';
import { ExerciseCard } from '@exercise/components/exercise-card.pom';
import { ToastDialog } from '@shared/components/toast-dialog.pom';
import { ConfirmDialog } from '@shared/components/confirm-dialog.pom';
import { ExerciseCardDetails } from './exercise-crud-serial.constants';

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
  await deleteCard(ExerciseCardDetails.NewCardName);
  await deleteCard(ExerciseCardDetails.UpdatedCardName);
});

export const test = base.extend<ExerciseCrudFixture>({
  exercisePage: async ({}, use) => {
    await use(new ExercisePage(page));
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

const deleteCard = async (cardName: string): Promise<void> => {
  const exerciseCard = new ExerciseCard(page);
  const exerciseForm = new ExerciseForm(page);
  const confirmDialog = new ConfirmDialog(page);
  
  if(await exerciseCard.getCardsByQuery(cardName).isVisible()) {
    await exerciseCard.openEditDialog(cardName);
    await exerciseForm.deleteExercise();
    await confirmDialog.clickYes();
  }
};

export { expect } from '@playwright/test';