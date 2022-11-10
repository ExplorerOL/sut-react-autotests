import SuitLogin from "../../sutTestSuites/SuiteLogin.js";
import SuiteLaborReports from "../../sutTestSuites/SuiteLaborReports.js";
import * as API from "../../support/API/apiFunctions";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe("Смоук тест Admin", () => {
    beforeEach(() => {
        localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
    });

    describe("Авторизация Admin", () => {
        let userCreds = creds_from_file.admin;
        let suitLogin = new SuitLogin();

        it("Вход в систему Admin", () => {
            //логин через UI
            suitLogin.doLoginUserAndCheckVisibleElems(userCreds).doNavigate();
        });

        it("Выход из системы Admin", () => {
            //логин через API
            API.doLoginAndSaveUserInfoAndToken(userCreds);
            suitLogin.pageLaborReports.doNavigate();

            //выход из системы через UI
            suitLogin.pageLaborReports.header.doLogout();
        });
    });

    describe("3.1.2 Отсутствия Admin", () => {
        let userCreds = creds_from_file.admin;
        let suitLaborReports = new SuiteLaborReports();
        let token;
        before(() => {
            localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
            API.doLoginAndSaveUserInfoAndToken(userCreds).then(() => {
                token = Cypress.env("userInfoFromPOST").token;
            });
        });

        beforeEach(() => {
            cy.setCookie("auth_token", token);
            API.deleteAllLeavePeriods(Cypress.env("userInfoFromPOST"));
        });

        it("3.1.2.1. Добавление больничного со страницы трудозатрат администратор.A", () => {
            suitLaborReports.addSickPeriod();
        });

        it("3.1.2.1. Добавление ежегодного отпуска со страницы трудозатрат администратор.A", () => {
            suitLaborReports.addPlannedLeavePeriod();
        });

        it("3.1.2.1. Добавление административного отпуска со страницы трудозатрат администратор.A", () => {
            suitLaborReports.addAdministrativeLeavePeriod();
        });
    });
});
