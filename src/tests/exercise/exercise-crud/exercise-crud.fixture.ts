import { mergeTests } from '@playwright/test';

import { test as exercisePage } from '@exercise/pages/exercise-page';
import { test as exerciseForm } from '@exercise/components/exercise-form';
import { test as exerciseCard } from '@exercise/components/exercise-card';
import { test as toastDialog } from '@shared/components/toast-dialog';
import { test as confirmDialog } from '@shared/components/confirm-dialog';

export const test = mergeTests(
  exercisePage,
  exerciseForm,
  exerciseCard,
  toastDialog,
  confirmDialog,
);

export { expect } from '@playwright/test';