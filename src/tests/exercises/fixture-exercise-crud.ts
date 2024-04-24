import { test as base, expect } from '@playwright/test';

import { ExercisePage } from '../../modules/exercise/pages/exercise-page';
import { ExerciseForm } from '../../modules/exercise/components/exercise-form';
import { ExerciseCardHandler } from '../../modules/shared/components/exercise-card';
import { ToastHandler } from '../../modules/shared/components/toast-dialog';

type ExerciseCrudFixtures = {
  exercisePage: ExercisePage;
  exerciseForm: ExerciseForm;
  exerciseCardHandler: ExerciseCardHandler;
  toastHandler: ToastHandler;
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
    const toastHandler = new ToastHandler(page);
    await use(toastHandler);
  }
})

export { expect } from '@playwright/test';