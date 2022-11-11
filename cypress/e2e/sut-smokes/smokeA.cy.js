import SuitLogin from "../../sutTestSuites/SuiteLogin.js";
import SuiteLaborReports from "../../sutTestSuites/SuiteLaborReports.js";
import * as API from "../../support/API/apiFunctions";
import * as helpers from "../../support/helpers.js";

//файл с набором валидных учетных записей
const creds = require("../../fixtures/userCreds.json");
const leavePeriodTypes = require("../../fixtures/leavePeriodTypes.json");

describe("Смоук тест Admin", () => {
    beforeEach(() => {
        localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
    });

    describe("Авторизация Admin", () => {
        let userCreds = creds.admin;
        let suitLogin = new SuitLogin();

        it("Вход в систему Admin", () => {
            //логин через UI
            suitLogin.doLoginUserAndCheckVisibleElems(userCreds).doNavigate();
        });

        it("Выход из системы Admin", () => {
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

    describe("3.1.2 Отсутствия Admin", () => {
        let userCreds = creds.admin;
        let suitLaborReports = new SuiteLaborReports();
        let token;
        let startDate = helpers.calculateLeavePeriodStartDateYYYYMMDD();
        let endDate = helpers.calculateLeavePeriodEndDateYYYYMMDD();

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
                    token = Cypress.env("userAuthInfoFromPOST").token;
                });
        });

        beforeEach(() => {
            cy.setCookie("auth_token", token);
            API.deleteAllLeavePeriods(Cypress.env("userAuthInfoFromPOST"));
        });

        it("3.1.2.1. Добавление больничного со страницы трудозатрат.A", () => {
            suitLaborReports.addLeavePeriod(leavePeriodTypes.sickPeriodType);
        });

        it("3.1.2.1. Добавление ежегодного отпуска со страницы трудозатрат.A", () => {
            suitLaborReports.addLeavePeriod(leavePeriodTypes.vacationPeriodType);
        });

        it("3.1.2.1. Добавление административного отпуска со страницы трудозатрат.A", () => {
            suitLaborReports.addLeavePeriod(leavePeriodTypes.administrativePeriodType);
        });
        it("3.1.2.1. Добавление декретного отпуска со страницы трудозатрат.A", () => {
            suitLaborReports.addLeavePeriod(leavePeriodTypes.maternityPeriodType);
        });

        it("3.1.2.1. Удаление больничного со страницы трудозатрат.A", () => {
            let periodType = leavePeriodTypes.sickPeriodType;
            API.addLeavePeriod(Cypress.env("userAuthInfoFromPOST"), periodType, startDate, endDate);
            suitLaborReports.pageLaborReports.doNavigate();

            suitLaborReports.deleteMostRecentLeavePeriod(periodType);
        });
        it("3.1.2.1. Удаление ежегодного отпуска со страницы трудозатрат.A", () => {
            let periodType = leavePeriodTypes.vacationPeriodType;
            API.addLeavePeriod(Cypress.env("userAuthInfoFromPOST"), periodType, startDate, endDate);
            suitLaborReports.pageLaborReports.doNavigate();

            console.log(periodType);
            suitLaborReports.deleteMostRecentLeavePeriod(periodType);
        });
        it("3.1.2.1. Удаление административного отпуска со страницы трудозатрат.A", () => {
            let periodType = leavePeriodTypes.administrativePeriodType;
            API.addLeavePeriod(Cypress.env("userAuthInfoFromPOST"), periodType, startDate, endDate);
            suitLaborReports.pageLaborReports.doNavigate();

            suitLaborReports.deleteMostRecentLeavePeriod(periodType);
        });
        it("3.1.2.1. Удаление декретного отпуска со страницы трудозатрат.A", () => {
            let periodType = leavePeriodTypes.maternityPeriodType;
            API.addLeavePeriod(Cypress.env("userAuthInfoFromPOST"), periodType, startDate, endDate);
            suitLaborReports.pageLaborReports.doNavigate();

            suitLaborReports.deleteMostRecentLeavePeriod(periodType);
        });
    });
});
