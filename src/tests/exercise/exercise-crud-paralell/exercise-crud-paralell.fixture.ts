import { type Page, test as base } from '@playwright/test';
import { ExercisePage } from '@exercise/pages/exercise-page.pom';
import { ExerciseForm } from '@exercise/components/exercise-form.pom';
import { ExerciseCard } from '@exercise/components/exercise-card.pom';
import { ToastDialog } from '@shared/components/toast-dialog.pom';
import { ConfirmDialog } from '@shared/components/confirm-dialog.pom';

import { exerciseToUpdateMock, exerciseToDeleteMock } from './exercise-crud-paralell.mocks';
import { Exercise } from '@exercise/interfaces/exercise.interface';

interface ExerciseCrudFixture {
  exercisePage: ExercisePage;
  exerciseForm: ExerciseForm;
  exerciseCard: ExerciseCard;
  toastDialog: ToastDialog;
  confirmDialog: ConfirmDialog;
} 

let page: Page;

base.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  const url = /http:\/\/localhost:3000\/exercises(\/\d+)?/;
  await page.route(url, async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 201 });
    } 
    if (route.request().method() === 'PUT') {
      await route.fulfill({ status: 200 });
    }
    if (route.request().method() === 'DELETE') {
      await route.fulfill({ status: 200 });
    } 
    if (route.request().method() === 'GET') {
      const response = await route.fetch();
      const json: Exercise[] = await response.json();
      json.push(exerciseToUpdateMock);
      json.push(exerciseToDeleteMock);
      await route.fulfill({ response, json });
    } 
  });

  await page.goto('http://localhost:4200/exercises');
  await page.waitForLoadState('networkidle');
});

export const test = base.extend<ExerciseCrudFixture>({
  exercisePage: async (_, use) => {
    await use(new ExercisePage(page));
  },
  exerciseForm: async (_, use) => {
    await use(new ExerciseForm(page));
  },
  exerciseCard: async (_, use) => {
    await use(new ExerciseCard(page));
  },
  toastDialog: async (_, use) => {
    await use(new ToastDialog(page));
  },
  confirmDialog: async (_, use) => {
    await use(new ConfirmDialog(page));
  }
});

export { expect } from '@playwright/test';