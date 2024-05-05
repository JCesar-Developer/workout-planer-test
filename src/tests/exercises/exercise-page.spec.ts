import { test } from './exercise-page/exercise-page.fixture'

//DICTIONARIES ---
enum PageDetails {
  Title = 'LISTA DE EJERCICIOS',
  InvalidText = 'Invalid Text',
}

//TESTS ---
//Read
test('Page should has a title', async ({ exercisePage, pageTemplate }) => {
  await exercisePage.goto();
  await pageTemplate.hasTitle(PageDetails.Title);
});

test('Page should has a list of exercises', async ({ exercisePage }) => {
  await exercisePage.hasCardList();
});

test('Page should has a list of exercises with at least one exercise', async ({ exercisePage, exerciseCardHandler }) => {
  await exercisePage.goto();
  await exerciseCardHandler.hasExerciseCards();
});

//Search by name
test('Should find 0 cards after put an invalid text in the search input', async ({ exercisePage, exerciseCardHandler }) => {
  await exercisePage.fillSearchBox(PageDetails.InvalidText);
  await exercisePage.quitSearchBox();
  await new Promise(resolve => setTimeout(resolve, 500));
  await exerciseCardHandler.hasNoExerciseCards();
});

test('Should find more one card after select an option in the search input', async ({ exercisePage, page, exerciseCardHandler }) => {
  await exercisePage.fillSearchBox('Lun');
  await page.getByRole('option', { name: 'Lunge con Mancuernas' }).click();
  await exerciseCardHandler.hasOneExerciseCard();
});

test('Should find more than 0 cards after put a valid text in the search input', async ({ exercisePage, exerciseCardHandler }) => {
  await exercisePage.fillSearchBox('Exerc');
  await exercisePage.quitSearchBox();
  await exerciseCardHandler.hasExerciseCards();
});

//Search by category
test('Page should find more than 0 cards after use a chip filter', async ({ exercisePage, exerciseCardHandler }) => {
  await exercisePage.selectFilterTab('Core');
  await exerciseCardHandler.hasExerciseCards();
});

test('Exercise cards filtered by category should have the correct category', async ({ exercisePage, exerciseCardHandler }) => {
  await exercisePage.selectFilterTab('Core');
  await exerciseCardHandler.hasExerciseCardsWithCategory('Core');
});