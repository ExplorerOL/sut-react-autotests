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

        it("3.1.2.1. Добавление больничного/отпуска со страницы трудозатрат администратор.A", () => {
            suitLaborReports.addSickPeriod();
        });
        it.only("тест", () => {
            console.log("before 11111111111111call");
            //cy.intercept("api/login").as("APILogin");
            //API.doLogin(userCreds);
            //     .then(() => {
            //     console.log("resp in then");
            //     //console.log(resp1);
            // });
            //cy.wait("@APILogin");
            console.log("resp in before");
            //console.log(resp);
            API.doLogin(userCreds).then(function () {
                // console.log("1 then");
                // console.log(response.body);
                // expect(response.status).to.eq(200);
                // expect(response.body.token).to.not.be.null;
                // cy.setCookie("auth_token", response.body.token);
                // console.log("POST /api/login answer was received");
                // Cypress.env("login_resp", response.body);
                // console.log("after call");
                // console.log(userInfo2);
                // testAuth.pageLaborReports.doNavigate().doWaitForApiResponse();
                // //API.getUserInfoByToken(cy.getCookie("auth_token"));
                API.getAllLeavePeriods(Cypress.env("login_resp"));
            });
            // console.log("from env in it withoun then");
            // console.log(Cypress.env("login_resp"));

            let i;
        });
    });
});
