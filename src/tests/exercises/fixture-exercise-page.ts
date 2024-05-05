import { test as base } from '@playwright/test';
import { ExercisePage } from '../../pom/exercise/pages/exercise-page';
import { ExerciseCardHandler } from '../../pom/shared/components/exercise-card';
import { PageTemplate } from '../../pom/shared/pages/template-page';

type ExercisePageFixture = {
  pageTemplate: PageTemplate;
  exercisePage: ExercisePage;
  exerciseCardHandler: ExerciseCardHandler;
}

export const test = base.extend<ExercisePageFixture>({
  exercisePage: async ({ page }, use) => {
    const exercisePage = new ExercisePage(page);
    await exercisePage.goto();
    await use(exercisePage);
  },
  pageTemplate: async ({ page, exercisePage }, use) => {
    const pageTemplate = new PageTemplate(page);
    await use(pageTemplate);
  },
  exerciseCardHandler: async ({ page, exercisePage }, use) => {
    const exerciseCardHandler = new ExerciseCardHandler(page);
    await use(exerciseCardHandler);
  }
});

export { expect } from '@playwright/test';