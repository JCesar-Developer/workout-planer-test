import { test as workoutPage } from '@workout/pages/workout-page';
import { test as pageTemplate } from '@shared/pages/template-page';
import { test as workoutCardHandler } from '@workout/components/workout-card';
import { mergeTests } from '@playwright/test';


export const test = mergeTests(
  workoutPage,
  pageTemplate,
  workoutCardHandler,
);

export { expect } from '@playwright/test';