import BasePage from "./base-page"
const crypto = require('crypto');

class StartedPage extends BasePage {
  private boardNameInput = '[data-cy="first-board"]'
  private signOut = '[data-cy="logged-user"]'
  
  constructor() {
    super('/')
  }
  fillBoardName(name:string) {
    cy.get(this.boardNameInput).type(name)
  }
  createBoard() {
    cy.get(this.boardNameInput).type('{enter}');
  }
  signOutClick() {
    cy.get(this.signOut).click()
  }
}

export default new StartedPage();


