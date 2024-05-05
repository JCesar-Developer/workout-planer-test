import { test, expect } from './fixture-exercise-crud'

//DICTIONARIES ---
enum DialogDetails {
  CreateTitle = 'Crear Ejercicio',
  UpdateTitle = 'Editar Ejercicio',
  confirmDelete = 'Estas seguro de que quieres eliminar este ejercicio?',
}

enum ExerciseCardDetails {
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

//TESTS ---
test('Complete exercise CRUD flux', async ({ exercisePage, exerciseForm, toastHandler, confirmDialog, exerciseCardHandler }) => {
  //create ---
  await exercisePage.openCreateExerciseDialog();
  await exerciseForm.dialogExists();

  await exerciseForm.hasTitle(DialogDetails.CreateTitle);

  await exerciseForm.fillExerciseName(ExerciseCardDetails.NewCardName);
  await exerciseForm.saveExercise();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastState(toastMessage.status.success);
  await toastHandler.showsToastSummary(toastMessage.message.successCreated);

  await exerciseCardHandler.cardExists(ExerciseCardDetails.NewCardName);

  //update ---
  await exerciseCardHandler.openUpdateExerciseDialog(ExerciseCardDetails.NewCardName);
  await exerciseForm.dialogExists();

  await exerciseForm.hasTitle(DialogDetails.UpdateTitle);

  await exerciseForm.fillExerciseName(ExerciseCardDetails.UpdatedCardName);
  await exerciseForm.saveExercise();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastState(toastMessage.status.success);
  await toastHandler.showsToastSummary(toastMessage.message.successUpdated);

  await exerciseCardHandler.cardExists(ExerciseCardDetails.UpdatedCardName);

  //delete ---
  await exerciseCardHandler.openUpdateExerciseDialog(ExerciseCardDetails.UpdatedCardName);
  await exerciseForm.deleteExercise();
  await confirmDialog.showsContent(DialogDetails.confirmDelete);

  await confirmDialog.clickYes();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastHandler.showsToastState(toastMessage.status.success);
  await toastHandler.showsToastSummary(toastMessage.message.successDeleted);

  await expect(exerciseCardHandler.getCardByName(ExerciseCardDetails.NewCardName)).not.toBeVisible();
  await expect(exerciseCardHandler.getCardByName(ExerciseCardDetails.UpdatedCardName)).not.toBeVisible();
});