import { mergeTests } from '@playwright/test';

import { test as exercisePageFixture } from '@exercise/pages/exercise-page';
import { test as exerciseCardFixture } from '@exercise/components/exercise-card';
import { test as templateFixture } from '@shared/pages/template-page';
import { test as searchBarFixture } from '@shared/components/searchbar.component';

export const test = mergeTests(
  templateFixture,
  exercisePageFixture, 
  exerciseCardFixture,
  searchBarFixture,
);

export { expect } from '@playwright/test';