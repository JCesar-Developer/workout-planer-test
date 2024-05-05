import { test as base } from '@playwright/test';
import { ExerciseCardHandler } from '../pom/shared/components/exercise-card';

export const test = base.extend<{ exerciseCardHandler: ExerciseCardHandler }>({
  exerciseCardHandler: async ({ page }, use) => {
    const exerciseCardHandler = new ExerciseCardHandler(page);
    await use(exerciseCardHandler);
  }
});

export { expect } from '@playwright/test';