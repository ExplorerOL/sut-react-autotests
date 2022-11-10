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
            suitLogin.loginUser(userCreds).doNavigate();
        });

        it("Выход из системы Admin", () => {
            //логин через API
            API.doLogin(userCreds);
            suitLogin.pageLaborReports.doNavigate();

            //выход из системы через UI
            suitLogin.pageLaborReports.header.doLogout();
        });
    });

    describe("3.1.2 Отсутствия Admin", () => {
        let userCreds = creds_from_file.admin;
        let testAuth = new SuitLogin();
        let suitLaborReports = new SuiteLaborReports();
        let userInfo2;

        before(() => {
            localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
        });

        it.only("3.1.2.1. Добавление больничного/отпуска со страницы трудозатрат администратор.A", () => {
            API.doLogin(userCreds)
                .then(function () {
                    API.getDeleteAllLeavePeriods(Cypress.env("login_resp"));
                })
                .then(function () {
                    suitLaborReports.addSickPeriod();
                });
        });
    });
});
