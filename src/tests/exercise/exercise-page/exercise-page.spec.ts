import { expect, test } from './exercise-page.fixture'

//DICTIONARIES ---
enum PageDetails {
  Title = 'LISTA DE EJERCICIOS',
  InvalidText = 'Invalid Text',
}

//TESTS ---
//Read
test('Page should has a title', { tag: '@fast'} , async ({ exercisePage, pageTemplate }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => exercisePage );
  await test.step('Then page should has "Lista de Ejercicios" as title', async () => {
    await pageTemplate.expectTitleToBe(PageDetails.Title);
  });
});

test('Page should has a list of exercises', { tag: '@fast'} , async ({ exercisePage }) => {
  await test.step('Then should has a list of exercises', async () => {
    await exercisePage.expectHasCardList();
  });
});

test('Page should has a list of exercises with at least one exercise', async ({ exercisePage, exerciseCard }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => {
    await exercisePage.goto();
  });
  await test.step('Then should has at least one exercise card', async () => {
    await exerciseCard.expectThereAreCards();
  });
});

//Search by term
test('Should find 0 cards after put an invalid text in the searchbar', { tag: '@fast'} , async ({ exercisePage, exerciseCard, searchBar }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => {
    await exercisePage.goto();
  });
  await test.step('When put an invalid text in the searchbar', async () => {
    await searchBar.fillSearchBox(PageDetails.InvalidText);
    await searchBar.quitSearchBox();
  });
  await test.step('Then page list should not display cards', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectThereAreNoCards();
  })
});

test('Should find more than 1 cards after put a valid text in the searchbar', { tag: '@fast'} , async ({ exercisePage, exerciseCard, searchBar }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => {
    await exercisePage.goto();
  });
  await test.step('When put a valid text in the searchbar', async () => {
    await searchBar.fillSearchBox('Exerc');
    await searchBar.quitSearchBox();
  })
  await test.step('Then page list should display more than 1 card', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectThereAreCards();
  });
});

test('Should find one card after select an option from the searchbar', { tag: '@fast'} , async ({ exercisePage, exerciseCard, searchBar }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => {
    await exercisePage.goto();
  });
  await test.step('When put a valid text in the search input', async () => {
    await searchBar.fillSearchBox('Lun');
  });
  await test.step('When select an option from the searchbar suggestions', async () => {
    await searchBar.selectOption('Lunge con Mancuernas');
  });
  await test.step('Then page list should display one card', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectThereIsOneCard();
  });
});

//Search by category
test('Page should find more than 1 cards after use a chip filter', { tag: '@fast'} , async ({ exercisePage, exerciseCard }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => {});
  await test.step('When select a chip filter', async () => {
    await exercisePage.selectFilterTab('Core');
  });
  await test.step('Then page list should display more than 1 card', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await exerciseCard.expectThereAreCards();
  });
});

test('Exercise cards filtered by category should have the correct category', { tag: '@fast'} , async ({ exercisePage, page, exerciseCard }) => {
  await test.step('Given a \'http://localhost:4200/exercises\' url', async () => {});
  await test.step('When select a chip filter', async () => {
    await exercisePage.selectFilterTab('Core');
  });
  await test.step('Then all cards should have the category "Core"', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    (await exerciseCard.getCards().all()).forEach(async card => {
      const category = await card.getByTestId('exercise-category').innerText()
      expect(category).toBe('Core');
    })
    await page.pause()
  });
});