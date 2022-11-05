import TestSuiteAuthotization from "../../sutTestSuites/TestSuiteAuthorization.js"
import TestSuiteLeavePeriod from "../../sutTestSuites/TestSuiteLeavePeriod.js"
import * as API from "../../support/API/apiFunctions";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe('Смоук тест Admin', () => {

    beforeEach(() => {
        localStorage.setItem('sut/onboardingStatus', '{"LaborCostsOnboardingFinished":true}');
    });

    describe('Авторизация Admin', () => {
        let adminData = creds_from_file.admin;
        let testAuth = new TestSuiteAuthotization;

        it('Вход в систему Admin', () => {
            //логин через UI
            testAuth.loginUser(adminData)
                .doNavigate();
        });

        it('Выход из системы Admin', () => {
            //логин через API
            API.doLogin(adminData);
            testAuth.pageWorkHours.doNavigate();

            //выход из системы через UI
            testAuth.pageWorkHours.header.doLogout();
        });
    });

    describe('3.1.2 Отсутствия Admin', () => {
        let adminData = creds_from_file.admin;
        let testAuth = new TestSuiteAuthotization;
        let suitLeavePeriod = new TestSuiteLeavePeriod;

        before(() => {
            localStorage.setItem('sut/onboardingStatus', '{"LaborCostsOnboardingFinished":true}');
            API.doLogin(adminData);
            testAuth.pageWorkHours.doNavigate();
        });

        it.only('3.1.2.1. Добавление больничного/отпуска со страницы трудозатрат администратор.A', () => {
            suitLeavePeriod.addSickPeriod();
        });
    });

});