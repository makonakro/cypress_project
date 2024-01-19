

export default class BasePage{
   private baseUrl:string;

  constructor(baseUrl: string) {
    this.baseUrl = Cypress.config('baseUrl')
  }

  open(path: string) {
    return cy.visit(path)
  }
}