import { test } from './workout-page.fixture';

//DICTIONARIES ---
enum PageDetails {
  Title = 'LISTA DE WORKOUTS',
}

//TESTS ---
test('Page should has "Lista de Workouts" title', async ({ workoutPage, pageTemplate }) => {
  await workoutPage.goto();
  await pageTemplate.expectTitleToBe(PageDetails.Title);
});

test('Page should has a list of workouts', async ({ workoutPage }) => {
  await workoutPage.hasWorkoutCardList();
});

test('Page should has a list of workouts with at least one workout', async ({ workoutPage, workoutCard: workoutCardHandler }) => {
  await workoutPage.goto();
  await workoutCardHandler.hasWorkoutCards();
});