import { test } from '@playwright/test';
import { describe } from 'node:test';
import { ExercisePage } from '../modules/exercise/exercise-page';

enum PageDetails {
  Title = 'LISTA DE EJERCICIOS',
  InvalidText = 'Invalid Text',
}

describe('Exercise Page component', () => {

	const rootUrl = 'http://localhost:4200/exercises';

	test.describe.configure({ mode: 'parallel' });
  let exercisePage: ExercisePage;

	test.beforeEach(async ({ page }) => {
		await page.goto(rootUrl);
    exercisePage = new ExercisePage(page);
	});

	//Read
	test('Page should has "Lista de Ejercicios" title', async () => {
    await exercisePage.hasTitle(PageDetails.Title);
	});

	test('Page should has a list of exercises', async () => {
		await exercisePage.hasCardList();
	});

	test('Page should has a list of exercises with at least one exercise', async () => {
    await exercisePage.hasExerciseCards();
	});

	//Search by name
	test('Should find 0 cards after put an invalid text in the search input', async () => {
    await exercisePage.fillSearchBox(PageDetails.InvalidText);
    await exercisePage.quitSearchBox();
		await new Promise(resolve => setTimeout(resolve, 500));
		await exercisePage.hasNoExerciseCards();
	});

	test('Should find more one card after select an option in the search input', async ({ page }) => {
    await exercisePage.fillSearchBox('Lun');
		await page.getByRole('option', { name: 'Lunge con Mancuernas' }).click();
    await exercisePage.hasOneExerciseCard();
  });

	test('Should find more than 0 cards after put a valid text in the search input', async () => {
    await exercisePage.fillSearchBox('Exerc');
    await exercisePage.quitSearchBox();
    await exercisePage.hasExerciseCards();
	});
	
	//Search by category
	test('Page should find more than 0 cards after use a chip filter', async () => {
		await exercisePage.selectFilterTab('Core');
    await exercisePage.hasExerciseCards();
	});

	test('Exercise cards filtered by category should have the correct category', async () => {
    await exercisePage.selectFilterTab('Core');
    await exercisePage.hasExerciseCardsByCategory('Core');
	});
});