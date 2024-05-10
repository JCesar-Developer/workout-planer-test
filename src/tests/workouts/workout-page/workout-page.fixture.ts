import { mergeTests } from '@playwright/test';
import { test as workoutPage } from '@workout/pages/workout-page.pom';
import { test as pageTemplate } from '@shared/pages/template-page.pom';
import { test as workoutCard } from '@workout/components/workout-card.pom';
import { test as searchBar } from '@shared/components/searchbar.pom';

export const test = mergeTests(
  workoutPage,
  pageTemplate,
  workoutCard,
  searchBar,
);

export { expect } from '@playwright/test';