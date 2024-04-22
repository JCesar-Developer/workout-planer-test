import { expect, test } from '../../fixtures/fixture-workout-crud';

//DICTIONARIES ---
enum DialogDetails {
  CreateTitle = 'Crear Rutina',
  UpdateTitle = 'Editar Rutina',
}

enum WorkoutCardDetails {
  NewCardName = 'Test workout',
  UpdatedCardName = 'Test workout updated',
}

const errorMessage = {
  void: 'Este campo es requerido',
}

const toastMessage = {
  status: {
    success: 'Success',
    error: 'Error',
  },
  message: {
    successCreated: `Rutina "${ WorkoutCardDetails.NewCardName }" creada con éxito`,
    successUpdated: `Rutina "${ WorkoutCardDetails.UpdatedCardName }" actualizada con éxito`,
    successDeleted: `Rutina "${ WorkoutCardDetails.UpdatedCardName }" eliminada con éxito`,
  }
}

//CONFIG ---
test.describe.configure({ mode: 'serial' });

//TESTS ---
test('Dialog create workout exists', async ({ workoutPage, workoutForm }) => {
  await workoutPage.openCreateWorkoutDialog();
  await workoutForm.dialogExists();
})

test('Dialog should have create title', async ({ workoutPage, workoutForm }) => {
  await workoutPage.openCreateWorkoutDialog();
  await workoutForm.hasTitle(DialogDetails.CreateTitle);
})

test('Form should throw an error if the workout name is empty', async ({ workoutPage, page, workoutForm }) => {
  await workoutPage.openCreateWorkoutDialog();
  await workoutForm.fillNameInput('');
  await page.keyboard.press('Tab');
  await workoutForm.hasNameError(errorMessage.void);
});

test('Form should throw an error if the workout duration is empty', async ({ workoutPage, page, workoutForm }) => {
  await workoutPage.openCreateWorkoutDialog();
  await workoutForm.fillDurationInput(0);
  await page.keyboard.press('Tab');
  await workoutForm.hasDurationError(errorMessage.void);
});

//save
test('Form should display a success message if a new workout is created successfully', async ({ workoutPage, workoutForm, toastHandler }) => {
  await workoutPage.openCreateWorkoutDialog();
  await workoutForm.fillNameInput(WorkoutCardDetails.NewCardName);
  await workoutForm.fillDurationInput(30);
  await workoutForm.selectExerciseCard(0);
  await workoutForm.selectExerciseCard(1);
  await workoutForm.saveWorkout();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successCreated);
});

test('Card should exist', async ({ workoutCardHandler }) => {
  await workoutCardHandler.workoutCardExists(WorkoutCardDetails.NewCardName);
});

//update
test('Dialog update workout exists', async ({ workoutCardHandler, workoutForm }) => {
  await workoutCardHandler.openUpdateWorkoutDialog(WorkoutCardDetails.NewCardName);
  await workoutForm.dialogExists();
});

test('Should have updated the exercise', async ({ workoutCardHandler, workoutForm, toastHandler }) => {
  await workoutCardHandler.openUpdateWorkoutDialog(WorkoutCardDetails.NewCardName);
  await workoutForm.fillNameInput(WorkoutCardDetails.UpdatedCardName);
  await workoutForm.saveWorkout();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successUpdated);
});

test('WorkoutCard should have been updated', async ({ workoutCardHandler }) => {
  await workoutCardHandler.workoutCardExists(WorkoutCardDetails.UpdatedCardName);
});

//delete 
test('Should delete the workout', async ({ workoutCardHandler, toastHandler }) => {
  await workoutCardHandler.deleteWorkout(WorkoutCardDetails.UpdatedCardName);
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastMessage(toastMessage.status.success, toastMessage.message.successDeleted);
});

test('WorkoutCard should have been deleted', async ({ workoutCardHandler }) => {
  await expect(workoutCardHandler.getWorkoutCardByName(WorkoutCardDetails.NewCardName)).not.toBeVisible();
  await expect(workoutCardHandler.getWorkoutCardByName(WorkoutCardDetails.UpdatedCardName)).not.toBeVisible();
});