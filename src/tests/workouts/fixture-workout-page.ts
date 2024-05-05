import { test as base } from '@playwright/test';
import { WorkoutPage } from '../../pom/workout/pages/workout-page';
import { PageTemplate } from '../../pom/shared/pages/template-page';
import { WorkoutCardHandler } from '../../pom/workout/components/workout-card';

type WorkoutPageFixture = {
  pageTemplate: PageTemplate;
  workoutPage: WorkoutPage;
  workoutCardHandler: WorkoutCardHandler;
}

export const test = base.extend<WorkoutPageFixture>({
  workoutPage: async ({ page }, use) => {
    const workoutPage = new WorkoutPage(page);
    await workoutPage.goto();
    await use(workoutPage);
  },
  pageTemplate: async ({ page, workoutPage }, use) => {
    const pageTemplate = new PageTemplate(page);
    await use(pageTemplate);
  },
  workoutCardHandler: async ({ page, workoutPage }, use) => {
    const workoutCardHandler = new WorkoutCardHandler(page);
    await use(workoutCardHandler);
  }
})

export { expect } from '@playwright/test';