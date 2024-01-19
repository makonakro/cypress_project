import BasePage from "./base-page"
const crypto = require('crypto');

class BoardsPage extends BasePage {
  private boardItem = '[data-cy="board-item"]'
  
  constructor() {
    super('/')
  }

  openBoard(name:string) {
    cy.contains(this.boardItem, name).click()
  }
}

export default new BoardsPage();



