import { expect, test } from './exercise-page.fixture'

//DICTIONARIES ---
enum PageDetails {
  Title = 'LISTA DE EJERCICIOS',
  InvalidText = 'Invalid Text',
}

//TESTS ---
//Read
test('Page should has a title', async ({ exercisePage, pageTemplate }) => {
  await exercisePage.goto();
  await expect(pageTemplate.pageTitle).toHaveText(PageDetails.Title);
});

test('Page should has a list of exercises', async ({ exercisePage }) => {
  await expect(exercisePage.cardList).toBeVisible();
});

test('Page should has a list of exercises with at least one exercise', async ({ exercisePage, exerciseCard }) => {
  await exercisePage.goto();
  const totalCards = await exerciseCard.cards.count();
  expect(totalCards).toBeGreaterThan(1);
});

//Search by name
test('Should find 0 cards after put an invalid text in the search input', async ({ exercisePage, exerciseCard, searchBar }) => {
  await exercisePage.goto();
  await searchBar.fillSearchBox(PageDetails.InvalidText);
  await searchBar.quitSearchBox();
  await new Promise(resolve => setTimeout(resolve, 500));

  const totalCards = await exerciseCard.cards.count();
  expect(totalCards).toBe(0);
});

test('Should find more one card after select an option in the search input', async ({ exercisePage, exerciseCard, searchBar }) => {
  await exercisePage.goto();
  await searchBar.fillSearchBox('Lun');
  await searchBar.selectOption('Lunge con Mancuernas');
  await new Promise(resolve => setTimeout(resolve, 500));

  const totalCards = await exerciseCard.cards.count();
  expect(totalCards).toBe(1);
});

test('Should find more than 0 cards after put a valid text in the search input', async ({ exercisePage, exerciseCard, searchBar }) => {
  await exercisePage.goto();
  await searchBar.fillSearchBox('Exerc');
  await searchBar.quitSearchBox();
  await new Promise(resolve => setTimeout(resolve, 500));

  const totalExerciseCards = await exerciseCard.cards.count();
  expect(totalExerciseCards).toBeGreaterThan(1);
});

//Search by category
test('Page should find more than 0 cards after use a chip filter', async ({ exercisePage, exerciseCard }) => {
  await exercisePage.selectFilterTab('Core');

  const totalExerciseCards = await exerciseCard.cards.count();
  expect(totalExerciseCards).toBeGreaterThan(1);
});

test('Exercise cards filtered by category should have the correct category', async ({ exercisePage, exerciseCard }) => {
  await exercisePage.selectFilterTab('Core');

  const totalCards = await exerciseCard.getCardsByCategory('Core').count();
    expect(totalCards).toBeGreaterThan(1);
});