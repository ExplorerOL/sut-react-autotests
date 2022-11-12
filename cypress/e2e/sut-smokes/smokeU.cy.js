import SuitLogin from "../../sutTestSuites/SuiteLogin.js";
import SuiteLaborReports from "../../sutTestSuites/SuiteLaborReports.js";
import * as API from "../../support/API/apiFunctions";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/validUserCreds");

describe("Смоук тест User", () => {
    beforeEach(() => {
        localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
    });

    describe("Авторизация User", () => {
        let userCreds = creds_from_file.user;
        let suitLogin = new SuitLogin();

        it("Вход в систему User", () => {
            //логин через UI
            suitLogin.doLoginUserAndCheckVisibleElems(userCreds).doNavigate();
        });

        it("Выход из системы User", () => {
            //логин через API
            API.doLogin(userCreds).then((POSTResponseBody) => {
                console.log(POSTResponseBody);
                API.saveUserInfoAndSetCookies(POSTResponseBody);
            });
            suitLogin.pageLaborReports.doNavigate();

            //выход из системы через UI
            suitLogin.pageLaborReports.header.doLogout();
        });
    });

    describe("3.1.2 Отсутствия User", () => {
        let userCreds = creds_from_file.user;
        let suitLaborReports = new SuiteLaborReports();
        let token;
        before(() => {
            localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
            // API.doLoginAndSaveUserInfoAndToken(userCreds).then(() => {
            //     token = Cypress.env("userInfoFromPOST").token;
            // });
            API.doLogin(userCreds)
                .then((POSTResponseBody) => {
                    API.saveUserInfoAndSetCookies(POSTResponseBody);
                })
                .then(() => {
                    token = Cypress.env("userAuthInfoByAP").token;
                });
        });

        beforeEach(() => {
            cy.setCookie("auth_token", token);
            API.deleteAllLeavePeriods(Cypress.env("userAuthInfoByAP"));
        });

        it.only("3.1.2.1. Добавление больничного со страницы трудозатрат.A", () => {
            suitLaborReports.addSickPeriod();
        });

        it("3.1.2.1. Добавление ежегодного отпуска со страницы трудозатрат.A", () => {
            suitLaborReports.addPlannedLeavePeriod();
        });

        it("3.1.2.1. Добавление административного отпуска со страницы трудозатрат.A", () => {
            suitLaborReports.addAdministrativeLeavePeriod();
        });
        it("3.1.2.1. Добавление декретного отпуска со страницы трудозатрат.A", () => {
            suitLaborReports.addMaternityPeriod();
        });

        it.only("3.1.2.1. Удаление больничного со страницы трудозатрат.A", () => {
            API.addLeavePeriod(Cypress.env("userAuthInfoByAP"), "SIC");
            suitLaborReports.pageLaborReports.doNavigate();
        });
    });
});
