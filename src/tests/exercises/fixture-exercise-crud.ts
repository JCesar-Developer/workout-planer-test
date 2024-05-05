import { test as base } from '@playwright/test';

import { ExercisePage } from '../../pom/exercise/pages/exercise-page';
import { ExerciseForm } from '../../pom/exercise/components/exercise-form';
import { ExerciseCardHandler } from '../../pom/shared/components/exercise-card';
import { ToastDialogHandler } from '../../pom/shared/components/toast-dialog';
import { ConfirmDialog } from '../../pom/shared/components/confirm-dialog';

type ExerciseCrudFixtures = {
  exercisePage: ExercisePage;
  exerciseForm: ExerciseForm;
  exerciseCardHandler: ExerciseCardHandler;
  toastHandler: ToastDialogHandler;
  confirmDialog: ConfirmDialog;
}

export const test = base.extend<ExerciseCrudFixtures>({
  exercisePage: async ({ page }, use) => {
    const exercisePage = new ExercisePage(page);
    await exercisePage.goto();
    await use(exercisePage);
  },
  exerciseForm: async ({ page }, use) => {
    const exerciseForm = new ExerciseForm(page);
    await use(exerciseForm);
  },
  exerciseCardHandler: async ({ page, exercisePage }, use) => {
    const exerciseCardHandler = new ExerciseCardHandler(page);
    await use(exerciseCardHandler);
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