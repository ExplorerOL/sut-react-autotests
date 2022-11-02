import Header from "./Header";
import PageWorkHours from "./PageWorkHours";

//const stand_url = require("../fixtures/stand_url.json"),

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
    getLblLoginUsingAccount() {
        return cy.xpath(LBL_LOGIN_USING_ACCOUNT);
    }
    getInputLoginLabel() {
        return cy.get(INPUT_LOGIN_LABEL);
    }
    getInputPasswordLabel() {
        return cy.get(INPUT_PASSWORD_LABEL);
    }
    getInputLogin() {
        return cy.get(INPUT_LOGIN);
    }
    getInputPassword() {
        return cy.get(INPUT_PASSWORD);
    }
    getBtnLogin() {
        return cy.get(BTN_LOGIN);
    }
    getLblLoginIsRequired(){
        return cy.get(LBL_LOGIN_REQUIRED);
    }
    getLblPasswordIsRequired(){
        return cy.get(LBL_PASSWORD_REQUIRED);
    }
    getLblWrongLoginOrPassword(){
        return cy.contains(STYLE_LBL_WRONG_LOGIN_OR_PASSWORD, LBL_WRONG_LOGIN_OR_PASSWORD);
    }

    //действия на странице
    doNavigate() {
        cy.visit("/login");
        this.checkPageElems();
        return this;
    }
    doCLickBtnLogin() {
        this.getBtnLogin().click();
        return this;
    }
    doTypeInLogin(text) {
        this.getInputLogin().type(text);
        return this;
    }
    doTypeInPassword(text) {
        this.getInputPassword().type(text);
        return this;
    }
    doLogin(userData) {
        this.doNavigate().doTypeInLogin(userData.username).doTypeInPassword(userData.password).doCLickBtnLogin();
        return this.pageWorkHours;
    }
    doApiLogin(userData) {
        // cy.intercept('/api/login/*').as('apiLogin');
        //         cy.wait('@apiLogin');
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
    checkPageElems() {
        this.getLblLoginUsingAccount().should('exist').and('be.visible');
        this.getInputLoginLabel().should('contain', 'Логин');
        this.getInputPasswordLabel().should('contain', 'Пароль');
        this.header.getBtnAuthUser().should('not.exist');
        cy.location('protocol').should('eq', 'https:');
        return this;
    }
    checkLblLoginIsRequiredVisible() {
        this.getLblLoginIsRequired().should('have.text','Поле обязательно').and('be.visible');
        return this;
    }
    checkLblPasswordIsRequiredVisible() {
        this.getLblPasswordIsRequired().should('have.text','Поле обязательно').and('be.visible');
        return this;

    }
    checkLblWrongLoginOrPasswordVisible() {
        this.getLblWrongLoginOrPassword().should('be.visible');
        return this;
        
    }
}