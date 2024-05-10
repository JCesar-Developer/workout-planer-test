import { test } from './exercise-crud-paralell.fixture';
import { ToastSummary } from '@/pom/shared/components/toast-dialog.pom';
import { DialogDetails, ExerciseCardDetails, toastMessage } from './exercise-crud-paralell.constants';

//TESTS ---
test('Create new exercise', async ({ exercisePage, exerciseForm, exerciseCard, toastDialog, confirmDialog }) => {
  await test.step('Given a user who opens the dialog to create a new exercise', async () => {
    await exercisePage.openDialog();
    await exerciseForm.expectHasTitle(DialogDetails.CreateTitle);
  });

  await test.step('When the user fills the exercise name input', async () => {
    await exerciseForm.fillExerciseName(ExerciseCardDetails.NewCardName);
  });

  await test.step('When the user saves the new exercise', async () => {
    await exerciseForm.saveExercise();
  });

  await test.step('Then the exercise card is created', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectCardExists(ExerciseCardDetails.NewCardName);
  });

  await test.step('Then success toast message is displayed', async () => {
    await toastDialog.expectSummaryBe(ToastSummary.Success);
    await toastDialog.expectDetailBe(toastMessage.successCreated);
  });

  await test.step('Then the new exercise card is deleted', async () => {
    await exerciseCard.openEditDialog(ExerciseCardDetails.NewCardName);
    await exerciseForm.deleteExercise();
    await confirmDialog.ExpectShowsContent(DialogDetails.confirmDelete);
    await confirmDialog.clickYes();
  });
})

test('Update exercise', async ({ exercisePage, exerciseCard, exerciseForm, toastDialog }) => {
  await test.step('Given a user who opens the dialog to update an exercise', async () => {
    exercisePage;
    await exerciseCard.openEditDialog(ExerciseCardDetails.CardToUpdateName);
    await exerciseForm.expectHasTitle(DialogDetails.UpdateTitle);
  });

  await test.step('When the user updates the exercise name input', async () => {
    await exerciseForm.fillExerciseName(ExerciseCardDetails.UpdatedCardName);
  });

  await test.step('When the user saves the updated exercise', async () => {
    await exerciseForm.saveExercise();
  });

  await test.step('Then the exercise card is updated', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectCardExists(ExerciseCardDetails.UpdatedCardName);
  });

  await test.step('Then success toast message is displayed', async () => {
    await toastDialog.expectSummaryBe(ToastSummary.Success);
    await toastDialog.expectDetailBe(toastMessage.successUpdated);
  });
});

test('Delete exercise', async ({ exercisePage, exerciseCard, exerciseForm, confirmDialog, toastDialog }) => {
  await test.step('Given a user who opens the dialog to delete an exercise', async () => {
    exercisePage;
    await exerciseCard.openEditDialog(ExerciseCardDetails.CardToDeleteName);
    await exerciseForm.deleteExercise();
    await confirmDialog.ExpectShowsContent(DialogDetails.confirmDelete);
  });
  
  await test.step('When the user confirms the delete action', async () => {
    await confirmDialog.clickYes();
  });
  
  await test.step('Then the exercise card is deleted', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectCardDoesNotExist(ExerciseCardDetails.CardToDeleteName);
  });

  await test.step('Then success toast message is displayed', async () => {
    await toastDialog.expectSummaryBe(ToastSummary.Success);
    await toastDialog.expectDetailBe(toastMessage.successDeleted);
  });
});