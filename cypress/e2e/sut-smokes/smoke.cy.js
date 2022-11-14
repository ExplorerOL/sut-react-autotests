import SuitLogin from "../../sutTestSuites/SuiteLogin.js";
import SuiteLaborReports from "../../sutTestSuites/SuiteLaborReports.js";
import * as API from "../../support/API/apiFunctions";
import * as helpers from "../../support/helpers.js";

//файл с набором валидных учетных записей
const creds = require("../../fixtures/validUserCreds");
const leavePeriodTypes = require("../../fixtures/leavePeriodTypes.json");

for (let nameOfUserObj in creds) {
    let userCreds = creds[nameOfUserObj];
    if (Cypress.env("userForTest") != "ALL" && nameOfUserObj != Cypress.env("userForTest")) {
        continue;
    }

    describe("Смоук тест " + nameOfUserObj, () => {
        beforeEach(() => {
            localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
        });

        describe("Авторизация " + nameOfUserObj, () => {
            let suitLogin = new SuitLogin();

            it("Вход в систему " + nameOfUserObj, function () {
                //логин через UI
                suitLogin.doLoginUserAndCheckVisibleElems(userCreds).doNavigate();
            });

            it("Выход из системы " + nameOfUserObj, () => {
                //логин через API
                API.doLogin(userCreds).then((POSTResponseBody) => {
                    API.saveUserInfoAndSetCookies(POSTResponseBody);
                });
                suitLogin.pageLaborReports.doNavigate();

                //выход из системы через UI
                suitLogin.pageLaborReports.header.doLogout();
            });
        });

        describe("3.1.2 Отсутствия " + nameOfUserObj, () => {
            //let userCreds = creds.admin;
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
                        token = Cypress.env("userAuthInfoByAPI").token;
                    });
            });

            beforeEach(() => {
                cy.setCookie("auth_token", token);
                API.deleteAllLeavePeriods(Cypress.env("userAuthInfoByAPI"));
            });

            it("3.1.2.1. Добавление больничного со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.sickPeriodType);
            });

            it("3.1.2.1. Добавление ежегодного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.vacationPeriodType);
            });

            it("3.1.2.1. Добавление административного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.administrativePeriodType);
            });
            it("3.1.2.1. Добавление декретного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.maternityPeriodType);
            });

            it("3.1.2.1. Удаление больничного со страницы трудозатрат " + nameOfUserObj, () => {
                let periodType = leavePeriodTypes.sickPeriodType;
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                suitLaborReports.pageLaborReports.doNavigate();

                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
            it("3.1.2.1. Удаление ежегодного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                let periodType = leavePeriodTypes.vacationPeriodType;
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                suitLaborReports.pageLaborReports.doNavigate();

                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
            it("3.1.2.1. Удаление административного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                let periodType = leavePeriodTypes.administrativePeriodType;
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                suitLaborReports.pageLaborReports.doNavigate();

                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
            it("3.1.2.1. Удаление декретного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                let periodType = leavePeriodTypes.maternityPeriodType;
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                suitLaborReports.pageLaborReports.doNavigate();

                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
        });
    });
}
