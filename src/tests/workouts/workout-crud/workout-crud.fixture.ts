import { test as workoutPage } from '@workout/pages/workout-page';
import { test as workoutCard } from '@workout/components/workout-card';
import { test as workoutForm } from '@workout/components/workout-form';
import { test as toastDialog } from '@shared/components/toast-dialog';
import { test as confirmDialog } from '@shared/components/confirm-dialog';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(
  workoutPage, 
  workoutForm, 
  workoutCard, 
  toastDialog, 
  confirmDialog
);

export { expect } from '@playwright/test';