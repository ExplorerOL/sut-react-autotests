import TestAuth from "../../sut-test-suites/authorizationSuite.js";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe("Смоук тест Admin", () => {
    beforeEach(() => {
        cy.viewport(1900, 1200);
    });

    let uname = "";
    let upassword = "";
    let testAuth = new TestAuth();

    // it('Авторизация Admin', () => {
    //         testAuth.authUser(creds_from_file.admin);
    // });

    it("Авторизация API Admin", () => {
        testAuth.loginApiUser(creds_from_file.admin);
        testAuth.pageLaborReports.doNavigate();
    });
    it("Выход из системы API Admin", () => {
        testAuth.logoutApiUser(creds_from_file.admin);
        testAuth.pageLogin.doNavigate();
    });
});
