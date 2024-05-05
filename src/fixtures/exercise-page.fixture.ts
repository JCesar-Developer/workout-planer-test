import { mergeTests } from '@playwright/test';

import { test as exerciseFixture } from './exercise.fixture';
import { test as exerciseCardFixture } from './exerciseCard.fixture';
import { test as templateFixture } from './template.fixture';

export const test = mergeTests(exerciseFixture, exerciseCardFixture, templateFixture);

export { expect } from '@playwright/test';