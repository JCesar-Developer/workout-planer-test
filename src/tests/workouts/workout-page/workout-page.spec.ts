import { test } from './workout-page.fixture';

//DICTIONARIES ---
enum PageDetails {
  Title = 'LISTA DE WORKOUTS',
  InvalidText = 'Invalid Text',
}

//TESTS ---
test('Page should has "Lista de Workouts" title', async ({ workoutPage, pageTemplate }) => {
  workoutPage
  await pageTemplate.expectTitleToBe(PageDetails.Title);
});

test('Page should has a list of workouts', async ({ workoutPage }) => {
  await workoutPage.expectHasCardList();
});

test('Page should has a list of workouts with at least one workout', async ({ workoutPage, workoutCard }) => {
  await workoutPage.goto();
  await workoutCard.expectThereAreCards();
});

//Search by term
test('Should find 0 cards after put an invalid text in the search input', async ({ workoutPage, workoutCard, searchBar }) => {
  await workoutPage.goto();
  await searchBar.fillSearchBox(PageDetails.InvalidText);
  await searchBar.quitSearchBox();

  await new Promise(resolve => setTimeout(resolve, 500));
  await workoutCard.expectThereAreNoCards();
});

test('Should find more than 1 cards after put a valid text in the search input', async ({ workoutPage, workoutCard, searchBar }) => {
  await workoutPage.goto();
  await searchBar.fillSearchBox('Pier');
  await searchBar.quitSearchBox();

  await new Promise(resolve => setTimeout(resolve, 500));
  await workoutCard.expectThereAreCards();
});

test('Should find one card after select an option from the searchbar', async ({ workoutPage, workoutCard, searchBar }) => {
  await workoutPage.goto();
  await searchBar.fillSearchBox('Pec');
  await searchBar.selectOption('Pecho');

  await new Promise(resolve => setTimeout(resolve, 500));
  await workoutCard.expectThereIsOneCard();
});