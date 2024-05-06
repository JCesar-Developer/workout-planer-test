import { expect, test } from './workout-crud.fixture';
import { DialogDetails, toastMessage, WorkoutCardDetails } from './workout-crud.details';

//TESTS ---
test('Complete workout CRUD flux', async ({ workoutPage, workoutForm, workoutCard, toastDialog, confirmDialog }) => {
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
  await toastDialog.ExpectShowsToastState(toastMessage.status.success);
  await toastDialog.ExpectShowsToastSummary(toastMessage.message.successCreated);

  await workoutCard.workoutCardExists(WorkoutCardDetails.NewCardName);

  //update ---
  await workoutCard.openUpdateWorkoutDialog(WorkoutCardDetails.NewCardName);
  await workoutForm.dialogExists();

  await workoutForm.hasTitle(DialogDetails.UpdateTitle);

  await workoutForm.fillNameInput(WorkoutCardDetails.UpdatedCardName);
  await workoutForm.saveWorkout();
  await new Promise(resolve => setTimeout(resolve, 500));
  await toastDialog.ExpectShowsToastState(toastMessage.status.success);
  await toastDialog.ExpectShowsToastSummary(toastMessage.message.successUpdated);

  await workoutCard.workoutCardExists(WorkoutCardDetails.UpdatedCardName);

  //delete ---
  await workoutCard.deleteWorkout(WorkoutCardDetails.UpdatedCardName);
  await confirmDialog.ExpectShowsContent(DialogDetails.ConfirmDelete);
  await confirmDialog.clickYes();

  await new Promise(resolve => setTimeout(resolve, 500));
  await toastDialog.ExpectShowsToastState(toastMessage.status.success);
  await toastDialog.ExpectShowsToastSummary(toastMessage.message.successDeleted);

  await expect(workoutCard.getWorkoutCardByName(WorkoutCardDetails.NewCardName)).not.toBeVisible();
  await expect(workoutCard.getWorkoutCardByName(WorkoutCardDetails.UpdatedCardName)).not.toBeVisible();
})