import { Page } from "@playwright/test";
import { ExerciseCard } from "@/pom/exercise/components/exercise-card.pom";
import { ExerciseForm } from "@/pom/exercise/components/exercise-form.pom";
import { ConfirmDialog } from "@/pom/shared/components/confirm-dialog.pom";

export const deleteCard = async (cardName: string, page: Page): Promise<void> => {
  const exerciseCard = new ExerciseCard(page);
  const exerciseForm = new ExerciseForm(page);
  const confirmDialog = new ConfirmDialog(page);
  
  if(await exerciseCard.getCardsByQuery(cardName).isVisible()) {
    await exerciseCard.openEditDialog(cardName);
    await exerciseForm.deleteExercise();
    await confirmDialog.clickYes();
  }
};