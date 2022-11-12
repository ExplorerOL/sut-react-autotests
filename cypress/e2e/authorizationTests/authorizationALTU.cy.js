import SuitLogin from "../../sutTestSuites/suiteLogin.js";
import * as API from "../../support/API/apiFunctions";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/validUserCreds");

describe("Тесты авторизации пользователей", () => {
    beforeEach(() => {
        localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
    });

    let suitLogin = new SuitLogin();
    let userData;

    //-------------- Admin ---------------
    it("Вход в систему Admin", () => {
        userData = creds_from_file.admin;
        //логин через UI
        suitLogin.doLoginUserAndCheckVisibleElems(userData);
    });

    it("Выход из системы Admin", () => {
        userData = creds_from_file.admin;
        //логин через API
        API.doLogin(userData);
        suitLogin.pageLaborReports.doNavigate();

        //выход из системы через UI
        suitLogin.doLogoutAndCheckVisibleElems();
    });

    //-------------- Tech Assist ---------------
    it("Вход в систему Tech assist", () => {
        userData = creds_from_file.tech_assist;
        //логин через UI
        suitLogin.doLoginUserAndCheckVisibleElems(userData);
    });

    it("Выход из системы Tech assist", () => {
        //логин через API
        API.doLogin(userData);
        suitLogin.pageLaborReports.doNavigate();

        //выход из системы через UI
        suitLogin.doLogoutAndCheckVisibleElems();
    });

    //-------------- Lead ---------------
    it("Вход в систему Lead", () => {
        userData = creds_from_file.lead;
        //логин через UI
        suitLogin.doLoginUserAndCheckVisibleElems(userData);
    });

    it("Выход из системы Lead", () => {
        //логин через API
        API.doLogin(userData);
        suitLogin.pageLaborReports.doNavigate();

        //выход из системы через UI
        suitLogin.doLogoutAndCheckVisibleElems();
    });

    //-------------- User ---------------
    it("Вход в систему User", () => {
        userData = creds_from_file.user;
        //логин через UI
        console.log(userData);
        suitLogin.doLoginUserAndCheckVisibleElems(userData);
    });

    it("Выход из системы User", () => {
        userData = creds_from_file.user;
        //логин через API
        API.doLogin(userData);
        suitLogin.pageLaborReports.doNavigate();

        //выход из системы через UI
        suitLogin.doLogoutAndCheckVisibleElems();
    });
});

describe("Негативные тесты авторизации", () => {
    beforeEach(() => {
        localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
    });

    let testAuth = new SuitLogin();
    let userData;

    //-------------- Негативные проверки ---------------
    it("Вход с пустым логином", () => {
        userData = creds_from_file.user;
        //логин через UI
        testAuth.doLoginWithoutLogin(userData);
    });
    it("Вход с пустым паролем", () => {
        userData = creds_from_file.user;
        //логин через UI
        testAuth.doLoginWithoutPassword(userData);
    });
    it("Вход с неправильным логином", () => {
        userData = creds_from_file.wrong_login_user;
        //логин через UI
        testAuth.doLoginWithWrongCreds(userData);
    });
    it("Вход с неправильным паролем", () => {
        userData = creds_from_file.wrong_password_user;
        //логин через UI
        testAuth.doLoginWithWrongCreds(userData);
    });
});
