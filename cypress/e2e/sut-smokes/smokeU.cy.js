import TestAuth from "../../sut-test-suites/authorizationSuite.js"

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe('Смоук тест User', () => {

    beforeEach(() => {
        cy.viewport(1900, 1200);
    });
    
    let uname = "";
    let upassword = "";
    let testAuth = new TestAuth;

    it('Авторизация User', () => {
            testAuth.authUser(creds_from_file.user);
    });

});