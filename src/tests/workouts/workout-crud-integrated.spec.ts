import { expect, test } from './fixture-workout-crud';

//DICTIONARIES ---
enum DialogDetails {
  CreateTitle = 'Crear Rutina',
  UpdateTitle = 'Editar Rutina',
  ConfirmDelete = 'Estas seguro de que quieres eliminar este entrenamiento?',
}

enum WorkoutCardDetails {
  NewCardName = 'Test workout',
  UpdatedCardName = 'Test workout updated',
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

//TESTS ---
test('Complete workout CRUD flux', async ({ workoutPage, workoutForm, toastHandler, confirmDialog, workoutCardHandler }) => {
  //create ---
  await workoutPage.openCreateWorkoutDialog();
  await workoutForm.dialogExists();

  await workoutForm.hasTitle(DialogDetails.CreateTitle);

  await workoutForm.fillNameInput(WorkoutCardDetails.NewCardName);
  await workoutForm.fillDurationInput(30);
  await workoutForm.selectExerciseCard(0);
  await workoutForm.selectExerciseCard(1);
  await workoutForm.fillAllSetsInputs(3);
  await workoutForm.fillAllRepsInputs(10);
  await workoutForm.fillAllRestsInputs(30);
  await workoutForm.saveWorkout();

  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastState(toastMessage.status.success);
  await toastHandler.showsToastSummary(toastMessage.message.successCreated);

  await workoutCardHandler.workoutCardExists(WorkoutCardDetails.NewCardName);

  //update ---
  await workoutCardHandler.openUpdateWorkoutDialog(WorkoutCardDetails.NewCardName);
  await workoutForm.dialogExists();

  await workoutForm.hasTitle(DialogDetails.UpdateTitle);

  await workoutForm.fillNameInput(WorkoutCardDetails.UpdatedCardName);
  await workoutForm.saveWorkout();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastState(toastMessage.status.success);
  await toastHandler.showsToastSummary(toastMessage.message.successUpdated);

  await workoutCardHandler.workoutCardExists(WorkoutCardDetails.UpdatedCardName);

  //delete ---
  await workoutCardHandler.deleteWorkout(WorkoutCardDetails.UpdatedCardName);
  await confirmDialog.showsContent(DialogDetails.ConfirmDelete);
  await confirmDialog.clickYes();

  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastState(toastMessage.status.success);
  await toastHandler.showsToastSummary(toastMessage.message.successDeleted);

  await expect(workoutCardHandler.getWorkoutCardByName(WorkoutCardDetails.NewCardName)).not.toBeVisible();
  await expect(workoutCardHandler.getWorkoutCardByName(WorkoutCardDetails.UpdatedCardName)).not.toBeVisible();
})