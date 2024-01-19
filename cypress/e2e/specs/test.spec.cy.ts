import SignIn from "../../../pages/sign-in"
import SignUp from "../../../pages/sign-up"
import StartedPage from "../../../pages/started-page"
import BoardPage from "../../../pages/board-page"
import BoardsPage from "../../../pages/boards-page"
import CardPage from "../../../pages/card-page"
import 'cypress-file-upload';

const crypto = require('crypto');
const email = `cypress+${crypto.randomBytes(5).toString('hex')}@test.com`
const boardName = crypto.randomBytes(5).toString('hex')
const cardName = 'first card'


describe('Sign up', () =>  {
  it('Sign up with valid credentials', () => {
    SignUp.open();
    SignUp.fillSignUpForm(email)
    SignUp.clickSignUp()
    cy.get('[data-cy="notification-message"]').should('have.text', 'User was successfully created')
    cy.get('h1').should('contain.text', ' Get started! ')
    cy.get('[data-cy="logged-user"]').should('contain.text', email)  
  })
})
describe('Work with board', () => {
  beforeEach(() => {
    SignIn.open();
    SignIn.fillSignInForm(email)
    SignIn.clickSignIn();
    cy.get('[data-cy="notification-message"]').should('have.text', 'User is logged in')
  })
  it('Create new board', () => {
    StartedPage.fillBoardName(boardName)
    StartedPage.createBoard();
    cy.get('.invisible').should('contain.text', boardName)
  })
  it('Mark board as favorite', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.addToFavorite();
    cy.get('[data-cy="star"]').should('not.have.class', 'text-white');
    cy.get('[data-cy="star"]').should('have.class', 'text-yellow-300');
  })
  it('Add list', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.createListClick('first list')
    cy.get('[data-cy="list-name"]').should('have.value', 'first list')
  })
  it('Update created list', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.renameList('new list')
    cy.get('[data-cy="list-name"]').should('have.value', 'new list')
  })
  it('Add new card', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.createCard(cardName)
    cy.get('[data-cy="card"]').should('contain.text', cardName)
  })
  it('Update card - add comment', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.openCard(cardName)
    CardPage.changeDescription('updated description')
    cy.get('[data-cy="notification-message"]').should('have.text', 'Description was changed')
    cy.get('[data-cy="card-description"]').should('have.value', 'updated description')
  }) 
  it('Update card - add file', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.openCard(cardName)
    CardPage.addFile()
    cy.get('input[type="file"]').selectFile('trello-image.png', {force: true})
    cy.get('[data-cy="image-attachment"]').should('contain.text', 'trello-image.png')
    cy.get('[data-cy="image-attachment"]').should('contain.text', 'Download')
    cy.get('[data-cy="image-attachment"]').should('contain.text', 'Delete')
    })
  it.skip('Move created card in new column' , () => { 
    // Test skipped because of mouse interaction works as not expected and described in cypress docs,
    // needs more time to investigate the solution
    BoardsPage.openBoard(boardName)
    BoardPage.createAnotherList('second list')
    cy.get('[data-cy="card"]').trigger('mousedown', { button: 0, clientX: 120, clientY: 160} );
    cy.get('[data-cy="list"]').eq(1).trigger('mousemove', {clientX: 429, clientY: 133});
    cy.get('[data-cy="list"]').eq(1).trigger('mouseup');
    cy.get('[data-cy="list"]').eq(1).should('contain.text', 'first card')
  })
  it('Delete created card', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.openCard(cardName)
    CardPage.deleteCardClick()
    cy.get('[data-cy="card"]').should('not.exist')
  })
  it('Delete created list', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.deleteList()
    cy.get('[data-cy="list"]').should('not.exist')
  })
  it('Delete created board', () => {
    BoardsPage.openBoard(boardName)
    BoardPage.deleteBoard()
    cy.get('[data-cy="notification-message"]').should('have.text', 'Board was deleted')
    cy.get('h1').should('contain.text', ' Get started! ')
  })
})