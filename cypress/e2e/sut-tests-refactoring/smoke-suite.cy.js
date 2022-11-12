import TestAuth from "../../sut-test-suites/authorizationSuite.js";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/validUserCreds");

describe("Тест авторизации", () => {
    beforeEach(() => {
        cy.viewport(1900, 1200);
    });

    let uname = "";
    let upassword = "";
    let testAuth = new TestAuth();

    for (let user_obj in creds_from_file) {
        it("Авторизация " + user_obj, () => {
            cy.log(
                "Авторизация пользователя: " +
                    creds_from_file[user_obj].username +
                    ", password: " +
                    creds_from_file[user_obj].password
            );
            testAuth.authUser(creds_from_file[user_obj]);
        });
    }

    it("Н. Авторизация без логина", () => {
        testAuth.loginWithoutLogin(creds_from_file.user);
    });

    it("Н. Авторизация без пароля", () => {
        testAuth.loginWithoutPassword(creds_from_file.user);
    });
});
