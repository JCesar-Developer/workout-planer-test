import { mergeTests } from '@playwright/test';
import { test as workoutPage } from '@workout/pages/workout-page';
import { test as pageTemplate } from '@shared/pages/template-page';
import { test as workoutCard } from '@workout/components/workout-card';
import { test as searchBar } from '@shared/components/searchbar';

export const test = mergeTests(
  workoutPage,
  pageTemplate,
  workoutCard,
  searchBar,
);

export { expect } from '@playwright/test';