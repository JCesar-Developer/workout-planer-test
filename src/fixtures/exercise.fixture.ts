import { test as base } from '@playwright/test';
import { ExercisePage } from '../pom/exercise/pages/exercise-page';

export const test = base.extend<{exercisePage: ExercisePage}>({
  exercisePage: async ({ page }, use) => {
    const exercisePage = new ExercisePage(page);
    await exercisePage.goto();
    await use(exercisePage);
  },
});

export { expect } from '@playwright/test';