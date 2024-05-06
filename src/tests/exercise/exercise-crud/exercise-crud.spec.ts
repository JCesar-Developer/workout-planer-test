import { test, expect } from './exercise-crud.fixture';
import { DialogDetails, ExerciseCardDetails, toastMessage } from './exercise-crud.details';

//TESTS ---
test('Complete exercise CRUD flux', async ({ exercisePage, exerciseForm, exerciseCard, toastDialog, confirmDialog }) => {
  //create ---
  await exercisePage.openDialog();
  await exerciseForm.dialogExists();

  await exerciseForm.hasTitle(DialogDetails.CreateTitle);

  await exerciseForm.fillExerciseName(ExerciseCardDetails.NewCardName);
  await exerciseForm.saveExercise();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await toastDialog.ExpectShowsToastState(toastMessage.status.success);
  await toastDialog.ExpectShowsToastSummary(toastMessage.message.successCreated);

  await exerciseCard.expectCardExists(ExerciseCardDetails.NewCardName);

  //update ---
  await exerciseCard.openUpdateExerciseDialog(ExerciseCardDetails.NewCardName);
  await exerciseForm.dialogExists();

  await exerciseForm.hasTitle(DialogDetails.UpdateTitle);

  await exerciseForm.fillExerciseName(ExerciseCardDetails.UpdatedCardName);
  await exerciseForm.saveExercise();
  await new Promise(resolve => setTimeout(resolve, 500));

  await toastDialog.ExpectShowsToastState(toastMessage.status.success);
  await toastDialog.ExpectShowsToastSummary(toastMessage.message.successUpdated);

  await exerciseCard.expectCardExists(ExerciseCardDetails.UpdatedCardName);

  //delete ---
  await exerciseCard.openUpdateExerciseDialog(ExerciseCardDetails.UpdatedCardName);
  await exerciseForm.deleteExercise();
  await confirmDialog.ExpectShowsContent(DialogDetails.confirmDelete);

  await confirmDialog.clickYes();
  await new Promise(resolve => setTimeout(resolve, 500));

  await toastDialog.ExpectShowsToastState(toastMessage.status.success);
  await toastDialog.ExpectShowsToastSummary(toastMessage.message.successDeleted);

  await expect(exerciseCard.getCardsByQuery(ExerciseCardDetails.NewCardName)).not.toBeVisible();
  await expect(exerciseCard.getCardsByQuery(ExerciseCardDetails.UpdatedCardName)).not.toBeVisible();
});