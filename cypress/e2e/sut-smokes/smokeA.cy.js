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
            API.doLogin(userCreds);
        });

        it("3.1.2.1. Добавление больничного/отпуска со страницы трудозатрат администратор.A", () => {
            suitLaborReports.addSickPeriod();
        });
        it.only("тест", () => {
            console.log("before 11111111111111call");
            let i;

            console.log("after call");
            console.log(userInfo2);
            testAuth.pageLaborReports.doNavigate().doWaitForApiResponse();
            //API.getUserInfoByToken(cy.getCookie("auth_token"));
            console.log("from env in it");
            console.log(Cypress.env("login_resp"));
            API.getAllLeavePeriods(Cypress.env("login_resp"));
        });
    });
});
