
import { expect, test } from './workout-crud-serial.fixture';
import { ToastSummary } from '@/pom/shared/components/toast-dialog.pom';
import { DialogDetails, toastMessage, WorkoutCardDetails } from './workout-crud-serial.constants';

test.describe.configure({ mode: 'serial' });

//TESTS ---
test('Create workout', { tag: '@slow'} , async ({ workoutPage, workoutForm, workoutCard, toastDialog }) => {
  await workoutPage.openFormDialog();
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
  await workoutCard.expectCardExists(WorkoutCardDetails.NewCardName);

  await toastDialog.expectSummaryBe(ToastSummary.Success);
  await toastDialog.expectDetailBe(toastMessage.successCreated);
});

test('Update workout', { tag: '@slow'} , async ({ workoutPage, workoutForm, workoutCard, toastDialog }) => {
  workoutPage
  await workoutCard.openUpdateWorkoutDialog(WorkoutCardDetails.NewCardName);
  await workoutForm.hasTitle(DialogDetails.UpdateTitle);

  await workoutForm.fillNameInput(WorkoutCardDetails.UpdatedCardName);
  await workoutForm.saveWorkout();
  
  await new Promise(resolve => setTimeout(resolve, 500));
  await workoutCard.expectCardExists(WorkoutCardDetails.UpdatedCardName);

  await toastDialog.expectSummaryBe(ToastSummary.Success);
  await toastDialog.expectDetailBe(toastMessage.successUpdated);
});

test('Delete workout', { tag: '@slow'} , async ({ workoutPage, workoutCard, toastDialog, confirmDialog }) => {
  workoutPage
  await workoutCard.deleteWorkout(WorkoutCardDetails.UpdatedCardName);
  await confirmDialog.ExpectShowsContent(DialogDetails.ConfirmDelete);
  await confirmDialog.clickYes();

  await new Promise(resolve => setTimeout(resolve, 500));
  await expect(workoutCard.getCardByName(WorkoutCardDetails.NewCardName)).not.toBeVisible();
  await expect(workoutCard.getCardByName(WorkoutCardDetails.UpdatedCardName)).not.toBeVisible();

  await toastDialog.expectSummaryBe(ToastSummary.Success);
  await toastDialog.expectDetailBe(toastMessage.successDeleted);
});