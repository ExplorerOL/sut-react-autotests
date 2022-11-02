import Header from "./Header";
import PageWorkHours from "./PageWorkHours/PageWorkHours";

//локаторы
const LBL_LOGIN_USING_ACCOUNT = "//p[.='Введите свои учётные данные']",
    INPUT_LOGIN_LABEL = "#mui-1-label",
    INPUT_PASSWORD_LABEL = "#mui-2-label",
    INPUT_LOGIN = "input[name='login']",
    INPUT_PASSWORD = "input[name='password']",
    BTN_LOGIN = "button[class*='MuiButton-containedSecondary'][type='submit']",
    LBL_LOGIN_REQUIRED = "p[id='mui-1-helper-text']",
    LBL_PASSWORD_REQUIRED = "p[id='mui-2-helper-text']",
    LBL_WRONG_LOGIN_OR_PASSWORD = 'Неверный',
    STYLE_LBL_WRONG_LOGIN_OR_PASSWORD = '.css-ifn6vo';

export default class PageLogin {
    constructor() {
        this.header = new Header;
        this.pageWorkHours = new PageWorkHours;
    }

//элементы страницы
    //текст приглашения о вводе учетных данных
    getLblLoginUsingAccount() {
        return cy.xpath(LBL_LOGIN_USING_ACCOUNT);
    }
    //текст-заглушка в поле логин
    getInputLoginLabel() {
        return cy.get(INPUT_LOGIN_LABEL);
    }
    //текст-заглушка в поле пароль
    getInputPasswordLabel() {
        return cy.get(INPUT_PASSWORD_LABEL);
    }
    //поле пароль
    getInputLogin() {
        return cy.get(INPUT_LOGIN);
    }
    //поле логин
    getInputPassword() {
        return cy.get(INPUT_PASSWORD);
    }
    //кнопка логин
    getBtnLogin() {
        return cy.get(BTN_LOGIN);
    }
    //надпись логин обязателен
    getLblLoginIsRequired(){
        return cy.get(LBL_LOGIN_REQUIRED);
    }
    //надпись пароль обязателен
    getLblPasswordIsRequired(){
        return cy.get(LBL_PASSWORD_REQUIRED);
    }
    //надпись логин или пароль неверные
    getLblWrongLoginOrPassword(){
        return cy.contains(STYLE_LBL_WRONG_LOGIN_OR_PASSWORD, LBL_WRONG_LOGIN_OR_PASSWORD);
    }

//действия на странице
    //открыть страницу и проверить наличие ее элементов
    doNavigate() {
        cy.visit("/login");
        this.checkPageElems();
        return this;
    }
    //нажать кнопку Логин
    doCLickBtnLogin() {
        this.getBtnLogin().click();
        return this;
    }
    //ввести тест в поле логин
    doTypeInLogin(text) {
        this.getInputLogin().type(text);
        return this;
    }
    //ввести тест в поле пароль
    doTypeInPassword(text) {
        this.getInputPassword().type(text);
        return this;
    }
    //процедура логина через UI
    doLogin(userData) {
        this.doNavigate().doTypeInLogin(userData.username).doTypeInPassword(userData.password).doCLickBtnLogin();
        return this.pageWorkHours;
    }
    //процедура логина через API
    doApiLogin(userData) {
        cy.request({
            method: 'POST',
            url: '/api/login',
            body: {
                "login": userData.username,
                "password": userData.password
            }
        }).then( function (response) {
            console.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body.token).to.not.be.null;
            cy.setCookie('auth_token', response.body.token);
            console.log("POST /api/login answer was received");
            return this.pageWorkHours;
        });
        
    }

//функции проверки страницы
    //проверка наличия элементов на странице
    checkPageElems() {
        this.getLblLoginUsingAccount().should('exist').and('be.visible');
        this.getInputLoginLabel().should('contain', 'Логин');
        this.getInputPasswordLabel().should('contain', 'Пароль');
        this.header.getBtnAuthUser().should('not.exist');
        cy.location('protocol').should('eq', 'https:');
        return this;
    }
    //проверка видимости надписи об обязательности ввода логина
    checkLblLoginIsRequiredVisible() {
        this.getLblLoginIsRequired().should('have.text','Поле обязательно').and('be.visible');
        return this;
    }
    //проверка видимости надписи об обязательности ввода пароля
    checkLblPasswordIsRequiredVisible() {
        this.getLblPasswordIsRequired().should('have.text','Поле обязательно').and('be.visible');
        return this;

    }
    //проверка видимости надписи о неверном логине или пароле
    checkLblWrongLoginOrPasswordVisible() {
        this.getLblWrongLoginOrPassword().should('be.visible');
        return this;
        
    }
}