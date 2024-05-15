import { mergeTests } from '@playwright/test';
import { test as workoutPage } from '@workout/pages/workout-page.pom';
import { pageTemplateFixture } from '@shared/pages/template-page.pom';
import { test as workoutCard } from '@workout/components/workout-card.pom';
import { searchBarFixture } from '@shared/components/searchbar.pom';

export const test = mergeTests(
  workoutPage,
  pageTemplateFixture,
  workoutCard,
  searchBarFixture,
);

export { expect } from '@playwright/test';