import { getGreeting } from '../support/app.po';

// describe('app', () => {
//   beforeEach(() => cy.visit('/'));

//   it('should display welcome message', () => {
//     // Custom command example, see `../support/commands.ts` file
//     cy.login('my-email@something.com', 'myPassword');

//     // Function helper example, see `../support/app.po.ts` file
//     getGreeting().contains('Welcome app');
//   });
// });


// describe('google search', () => {
//   beforeEach(() => cy.visit('http://google.com'));

//   it('el fogadjuk a feltételeket', () => {

//     cy.get('button').contains('Az összes elfogadása').click();
//   });

//   it('keresünk almafa metszést', () => {

//     cy.get('button').contains('Az összes elfogadása').click();
//     cy.get('textarea[title="Keresés"]').type('alma');

//     cy.get('ul').get('li').contains('almafa metszése').click();
//   });

//   it('keresünk alma szóra kiválasztjuk az elsőt', () => {

//     cy.get('button').contains('Az összes elfogadása').click();
//     cy.get('textarea[title="Keresés"]').type('alma');

//     // cy.get('ul').get('li:first-child').click();
//     // cy.get('ul').get('li:first-child').click({multiple: true});
//     // cy.get('ul').get('li:first-child').contains('Alma').click({multiple: true});
//   });

// })

describe('fixtures', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/getAll', {
      fixture: `getAll.json`,
    })
    cy.fixture('getAll.json').then(fixture => {
      cy.intercept('GET', '**/get/*', (req) => {
        const id = req.url.split('/').pop();   // last part of url path 
        console.log(id, fixture)
        const resp = fixture.find((resp: any) => resp.id == id).content
        req.reply(resp);
      })
      // fixture.item.id = id;                  // add the id dynamically 
      // req.reply(fixture);                    // send altered fixture
    })
    
    cy.visit('/');

    
  });
  

  it('Kiiírja az összes elemet', () => {

    cy.get('a.get-all-item').should('exist');
    cy.get('a.get-all-item').then((anchors) => {
      console.log(anchors)
      assert(anchors.length === 3, 'A lista 3 elemű');
    })

  } )
})