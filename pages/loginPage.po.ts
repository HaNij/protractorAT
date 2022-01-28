import {browser, element, by, ElementFinder} from 'protractor';

/**
 * Класс страницы авторизации
 * 
 * @export
 * @class loginPage
 */

export class LoginPage {

    baseUrl : string = "https://auth-statserv.profintel.ru/#/?redirect_url=";
    usernameField : ElementFinder = element(by.xpath("//*[@id='username']"));
    passwordField : ElementFinder = element(by.xpath("//*[@id='password']"));
    loginButton : ElementFinder = element(by.xpath("//*[@id='submitbutton']"));

    async get() {
        await browser.get(this.baseUrl);
    }

    async login(userData : Object) {
         await this.usernameField.sendKeys(userData["username"]);
         await this.passwordField.sendKeys(userData["password"]);
         await this.loginButton.click();
     }
 }