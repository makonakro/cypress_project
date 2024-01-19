import BasePage from "./base-page"
const crypto = require('crypto');

class CardPage extends BasePage {
  private boardItem = '[data-cy="board-item"]'
  private description = '[data-cy="card-description"]'
  private toast = '[data-cy="notification-message"]'
  private selectFile = 'label:nth-child(3)'
  private deleteCard = '[data-cy="card-detail-delete"]'

  
  constructor() {
    super('/')
  }

  changeDescription(text:string) {
    cy.get(this.description).type(text)
    cy.get(this.description).type('{enter}')
  }

  addFile() {
    cy.get(this.selectFile).click()
  }

  deleteCardClick() {
  cy.get(this.deleteCard).click()
  }
}

export default new CardPage();



