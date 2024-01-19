import BasePage from "./base-page"
const crypto = require('crypto');

class SignIn extends BasePage {
  private emailInput = '[data-cy="login-email"]'
  private passwordInput = '[data-cy="login-password"]'
  private submitButton = '[data-cy="login-submit"]'
  
  constructor() {
    super('/login')
  }

  fillSignInForm(email:string) {
    cy.get(this.emailInput).type(email)
    cy.get(this.passwordInput).type(Cypress.env('password'))
  }

  clickSignIn() {
    cy.get(this.submitButton).click()
  }
  
  open() {
    return super.open('/login')
  }
}

export default new SignIn();

