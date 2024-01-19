import BasePage from "./base-page"


const crypto = require('crypto');

class SignUp extends BasePage {
  private emailInput = '[data-cy="signup-email"]'
  private passwordInput = '[data-cy="signup-password"]'
  private submitButton = '[data-cy="signup-submit"]'
  
  constructor() {
    super('/signup')
  }

  fillSignUpForm(email: string) {
    cy.get(this.emailInput).type(email)
    cy.get(this.passwordInput).type(Cypress.env('password'))
  }

  clickSignUp() {
    cy.get(this.submitButton).click()
  }
  
  open() {
    return super.open('/signup')
  }
}

export default new SignUp();

