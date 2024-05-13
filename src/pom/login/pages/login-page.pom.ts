import { Locator, Page } from "@playwright/test";

export class LoginPage {

  private readonly loginContainer: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly registerLink: Locator;

  constructor( private page: Page ) {
    this.loginContainer = this.page.locator('section');
    this.usernameInput = this.page.getByTestId('username-input');
    this.passwordInput = this.page.getByTestId('password-input').getByRole('textbox');
    this.loginButton = this.page.getByTestId('login-button');
    this.forgotPasswordLink = this.page.getByTestId('forgot-password-link');
    this.registerLink = this.page.getByTestId('register-link');
  }

  //Actions
  async goto() {
    await this.page.goto('http://localhost:4200/auth/login');
  }

  async fillUsername( username: string ) {
    await this.usernameInput.fill( username );
  }

  async fillPassword( password: string ) {
    await this.passwordInput.fill( password );
  }

  async clickOnLoginContainer() {
    await this.loginContainer.click();
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }

  async clickOnForgotPasswordLink() {
    await this.forgotPasswordLink.click();
  }

  async clickOnRegisterLink() {
    await this.registerLink.click();
  }

  //Assertions

}