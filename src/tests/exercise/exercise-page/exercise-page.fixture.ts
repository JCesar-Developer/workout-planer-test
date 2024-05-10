import { mergeTests } from '@playwright/test';

import { test as exercisePageFixture } from '@exercise/pages/exercise-page.pom';
import { test as exerciseCardFixture } from '@exercise/components/exercise-card.pom';
import { test as templateFixture } from '@shared/pages/template-page.pom';
import { test as searchBarFixture } from '@shared/components/searchbar.pom';

export const test = mergeTests(
  templateFixture,
  exercisePageFixture, 
  exerciseCardFixture,
  searchBarFixture,
);

export { expect } from '@playwright/test';