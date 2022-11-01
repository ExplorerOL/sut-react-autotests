import TestAuth from "../../sut-test-suites/authorizationSuite.js"

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe('Смоук тест Admin', () => {

    beforeEach(() => {
        cy.viewport(1900, 1200);
    });
    
    let adminData = creds_from_file.admin;
    let testAuth = new TestAuth;

    it('Авторизация Admin', () => {
        //логин через UI
        testAuth.loginUser(adminData)
            .doNavigate();
    });

    it('Выход из системы Admin', () => {
        //логин через API
        testAuth.loginApiUser(adminData);
        testAuth.pageWorkHours.doNavigate();

        //выход из системы через UI
        testAuth.pageWorkHours.header.doLogout();
    });

});