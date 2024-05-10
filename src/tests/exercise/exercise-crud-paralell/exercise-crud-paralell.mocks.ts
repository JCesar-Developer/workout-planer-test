import { Category, Exercise } from "@exercise/interfaces/exercise.interface";
import { ExerciseCardDetails } from "./exercise-crud-paralell.constants";

export const exerciseToUpdateMock: Exercise = {
  id: "mock-id-update",
  name: ExerciseCardDetails.CardToUpdateName,
  image: "./assets/images/exercises/exercise-1.gif",
  category: Category.LEGS,
  alternativeImage: null
}

export const exerciseToDeleteMock: Exercise = {
  id: "mock-id-delete",
  name: ExerciseCardDetails.CardToDeleteName,
  image: "./assets/images/exercises/exercise-1.gif",
  category: Category.LEGS,
  alternativeImage: null
}