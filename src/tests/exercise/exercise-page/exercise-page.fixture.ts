import { mergeTests } from '@playwright/test';

import { exercisePageFixture } from '@exercise/pages/exercise-page.pom';
import { exerciseCardFixture } from '@exercise/components/exercise-card.pom';
import { pageTemplateFixture } from '@shared/pages/template-page.pom';
import { searchBarFixture } from '@shared/components/searchbar.pom';

export const test = mergeTests(
  pageTemplateFixture,
  exercisePageFixture, 
  exerciseCardFixture,
  searchBarFixture,
);

export { expect } from '@playwright/test';