import { test } from '../../fixtures/fixture-workout-page';

//DICTIONARIES ---
enum PageDetails {
  Title = 'LISTA DE WORKOUTS',
}

//TESTS ---
test('Page should has "Lista de Workouts" title', async ({ pageTemplate }) => {
  await pageTemplate.hasTitle(PageDetails.Title);
});

test('Page should has a list of workouts', async ({ workoutPage }) => {
  await workoutPage.hasWorkoutCardList();
});

test('Page should has a list of workouts with at least one workout', async ({ workoutCardHandler }) => {
  await workoutCardHandler.hasWorkoutCards();
});