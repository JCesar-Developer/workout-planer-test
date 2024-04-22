import { describe } from 'node:test';
import { test, expect } from '@playwright/test';
import { ExercisePage } from '../modules/exercise/pages/exercise-page';
import { ExerciseForm } from '../modules/exercise/components/exercise-form';
import { ExerciseCardHandler } from '../modules/shared/components/exercise-card';
import { ToastHandler } from '../modules/shared/components/toast';

enum DialogDetails {
  CreateTitle = 'Crear Ejercicio',
  UpdateTitle = 'Editar Ejercicio',
}

enum CardDetails {
  NewCardName = 'Test exercise',
  UpdatedCardName = 'Test exercise updated',
}

describe('Exercise Form component', () => {

  const rootUrl = 'http://localhost:4200/exercises';

  test.describe.configure({ mode: 'serial' });

  const toastMessage = {
    status: {
      success: 'Success',
      error: 'Error',
    },
    message: {
      successCreated: 'Ejercicio "Test exercise" creado con éxito',
      successUpdated: 'Ejercicio "Test exercise updated" actualizado con éxito',
      successDeleted: 'Ejercicio "Test exercise updated" eliminado con éxito',
    }
  }

  const errorMessage = {
    void: 'Este campo es requerido',
    notEnoughLetters: 'Este campo debe tener al menos 3 caracteres',
  }

  let exercisePage: ExercisePage;
	let exerciseForm: ExerciseForm;
  let exerciseCardHandler: ExerciseCardHandler;
  let toastHandler: ToastHandler;

  test.beforeEach(async ({ page }) => {
		await page.goto(rootUrl);
    exercisePage = new ExercisePage(page);
    exerciseForm = new ExerciseForm(page);
    exerciseCardHandler = new ExerciseCardHandler(page);
    toastHandler = new ToastHandler(page);
	});

  test('Dialog create exercise exists', async () => {
    await exercisePage.openCreateExerciseDialog();
    await exerciseForm.dialogExists();
  });

  test('Dialog should have create title', async () => {
    await exercisePage.openCreateExerciseDialog();
    await exerciseForm.hasTitle(DialogDetails.CreateTitle);
  });
  
	//Save
	test('Form should throw an error if the exercise name is empty', async () => {
    await exercisePage.openCreateExerciseDialog();
    await exerciseForm.saveExercise();
    await exerciseForm.hasError(errorMessage.void);
	});

  test('Form should throw an error if the exercise name has not enough letters', async () => {
    await exercisePage.openCreateExerciseDialog();
    await exerciseForm.fillExerciseName('Te');
    await exerciseForm.saveExercise();
    await exerciseForm.hasError(errorMessage.notEnoughLetters);
	});

	test('Form should display a success message if a new exercise is created successfully', async () => {
		await exercisePage.openCreateExerciseDialog();
    await exerciseForm.fillExerciseName(CardDetails.NewCardName);
    await exerciseForm.saveExercise();
		await new Promise(resolve => setTimeout(resolve, 500));
    await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successCreated);
	});

	test('Form should have created a new exercise', async () => {
    await exerciseCardHandler.cardExists(CardDetails.NewCardName);
	});

	//Update
  test('Dialog update exercise exists', async () => {
    await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.NewCardName);
    await exerciseForm.dialogExists();
  })

  test('Dialog should have update title', async () => {
    await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.NewCardName);
    await exerciseForm.hasTitle(DialogDetails.UpdateTitle);
  });

	test('Form should display a success message if an exercise have been updated successfully', async () => {
    await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.NewCardName);
    await exerciseForm.fillExerciseName(CardDetails.UpdatedCardName);
    await exerciseForm.saveExercise();
		await new Promise(resolve => setTimeout(resolve, 500));
    await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successUpdated);
	});

	test('Form should have updated an exercise', async () => {
    await exerciseCardHandler.cardExists(CardDetails.UpdatedCardName);
	});

	//Delete
	test('Form should display a success message if an exercise have been deleted successfully', async () => {
    await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.UpdatedCardName);
    await exerciseForm.deleteExercise();
		await new Promise(resolve => setTimeout(resolve, 500));
    await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successDeleted);
	});

	test('Form should have deleted an exercise', async () => {
    await expect(exerciseCardHandler.getCardByName(CardDetails.NewCardName)).not.toBeVisible();
    await expect(exerciseCardHandler.getCardByName(CardDetails.UpdatedCardName)).not.toBeVisible();
	});
});