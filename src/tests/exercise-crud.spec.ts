import { test, expect } from '../fixtures/fixture-exercise-crud'

//DICTIONARIES ---
enum DialogDetails {
  CreateTitle = 'Crear Ejercicio',
  UpdateTitle = 'Editar Ejercicio',
}

enum CardDetails {
  NewCardName = 'Test exercise',
  UpdatedCardName = 'Test exercise updated',
}

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

//CONFIG ---
test.describe.configure({ mode: 'serial' });

//TESTS ---
test('Dialog create exercise exists', async ({ exercisePage, exerciseForm }) => {
  await exercisePage.openCreateExerciseDialog();
  await exerciseForm.dialogExists();
});

test('Dialog should have create title', async ({ exercisePage, exerciseForm }) => {
  await exercisePage.openCreateExerciseDialog();
  await exerciseForm.hasTitle(DialogDetails.CreateTitle);
});

//Save
test('Form should throw an error if the exercise name is empty', async ({ exercisePage, exerciseForm }) => {
  await exercisePage.openCreateExerciseDialog();
  await exerciseForm.saveExercise();
  await exerciseForm.hasError(errorMessage.void);
});

test('Form should throw an error if the exercise name has not enough letters', async ({ exercisePage, exerciseForm }) => {
  await exercisePage.openCreateExerciseDialog();
  await exerciseForm.fillExerciseName('Te');
  await exerciseForm.saveExercise();
  await exerciseForm.hasError(errorMessage.notEnoughLetters);
});

test('Form should display a success message if a new exercise is created successfully', async ({ exercisePage, exerciseForm, toastHandler }) => {
  await exercisePage.openCreateExerciseDialog();
  await exerciseForm.fillExerciseName(CardDetails.NewCardName);
  await exerciseForm.saveExercise();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successCreated);
});

test('Form should have created a new exercise', async ({ exerciseCardHandler }) => {
  await exerciseCardHandler.cardExists(CardDetails.NewCardName);
});

//Update
test('Dialog update exercise exists', async ({ exerciseCardHandler, exerciseForm }) => {
  await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.NewCardName);
  await exerciseForm.dialogExists();
})

test('Dialog should have update title', async ({ exerciseCardHandler, exerciseForm }) => {
  await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.NewCardName);
  await exerciseForm.hasTitle(DialogDetails.UpdateTitle);
});

test('Form should display a success message if an exercise have been updated successfully', async ({ exerciseCardHandler, exerciseForm, toastHandler }) => {
  await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.NewCardName);
  await exerciseForm.fillExerciseName(CardDetails.UpdatedCardName);
  await exerciseForm.saveExercise();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successUpdated);
});

test('Form should have updated an exercise', async ({ exerciseCardHandler }) => {
  await exerciseCardHandler.cardExists(CardDetails.UpdatedCardName);
});

//Delete
test('Form should display a success message if an exercise have been deleted successfully', async ({ exerciseCardHandler, exerciseForm, toastHandler }) => {
  await exerciseCardHandler.openUpdateExerciseDialog(CardDetails.UpdatedCardName);
  await exerciseForm.deleteExercise();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successDeleted);
});

test('Form should have deleted an exercise', async ({ exerciseCardHandler }) => {
  await expect(exerciseCardHandler.getCardByName(CardDetails.NewCardName)).not.toBeVisible();
  await expect(exerciseCardHandler.getCardByName(CardDetails.UpdatedCardName)).not.toBeVisible();
});