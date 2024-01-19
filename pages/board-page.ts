import BasePage from "./base-page"
const crypto = require('crypto');

class BoardPage extends BasePage {
  private favoriteButton = '[data-cy="star"]'
  private createList = '[data-cy="create-list"]'
  private fillListInput = '[data-cy="add-list-input"]'
  private addList = '.inline-block.py-1'
  private rename = '[data-cy="list-name"]'
  private createNewCard = '[data-cy="new-card"]'
  private addCardTitle = '[data-cy="new-card-input"]'
  private addCardConfirm = '.mt-1'
  private card = '[data-cy="card"]'
  private listOptions = '[data-cy="list-options"]'
  private deleteListOption = '[data-cy="delete-list"]'
  private boardOption = '[data-cy="board-options"]'
  private deleteBoardOption = '[data-cy="delete-board"]'

  
  constructor() {
    super('/')
  }

  addToFavorite() {
    cy.get(this.favoriteButton).click()
  }

  createListClick(name:string) {
    cy.get(this.fillListInput).type(name)
    cy.get(this.addList).click()
  }

  createAnotherList(name:string) {
    cy.get(this.createList).click()
    cy.get(this.fillListInput).type(name)
    cy.get(this.addList).type('{enter}')
  }

  renameList(newName: string) {
    cy.get(this.rename).click()
    cy.get(this.rename).type('{selectall}')
    cy.get(this.rename).type('{backspace}')
    cy.get(this.rename).type(newName)
    cy.get(this.rename).type('{enter}');
  }

  createCard(name: string) {
    cy.get(this.createNewCard).click()
    cy.get(this.addCardTitle).type(name)
    cy.get(this.addCardConfirm).click()
  }

  openCard(name:string) 
  {
    cy.contains(this.card, name).click()
  }

  deleteList() {
    cy.get(this.listOptions).click()
    cy.get(this.deleteListOption).click()
  }
  deleteBoard() {
    cy.get(this.boardOption).click()
    cy.get(this.deleteBoardOption).click()
  }
}

export default new BoardPage();


