import TestSuiteAuthotization from "../../sutTestSuites/TestSuiteAuthorization.js"

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe('Тест авторизации пользователей', () => {

    beforeEach(() => {
        localStorage.setItem('sut/onboardingStatus', '{"LaborCostsOnboardingFinished":true}');
    });
    
    let testAuth = new TestSuiteAuthotization;
    let userData;

    //-------------- Admin ---------------
    it('Вход в систему Admin', () => {
        userData = creds_from_file.admin;
        //логин через UI
        //console.log(userData);
        testAuth.loginUser(userData);
    });

    it('Выход из системы Admin', () => {
        userData = creds_from_file.admin;
        //логин через API
        testAuth.loginApiUser(userData);
        testAuth.pageWorkHours.doNavigate();

        //выход из системы через UI
        testAuth.logoutUser()
            .checkPageElems();
    });

    //-------------- Tech Assist ---------------
    it('Вход в систему Tech assist', () => {
        userData = creds_from_file.tech_assist;
        //логин через UI
        testAuth.loginUser(userData);
    });

    it('Выход из системы Tech assist', () => {
        //логин через API
        testAuth.loginApiUser(userData);
        testAuth.pageWorkHours.doNavigate();

        //выход из системы через UI
        testAuth.logoutUser()
            .checkPageElems();
    });

    //-------------- Lead ---------------
    it('Вход в систему Lead', () => {
        userData = creds_from_file.lead;
        //логин через UI
        testAuth.loginUser(userData);
    });

    it('Выход из системы Tech assist', () => {
        //логин через API
        testAuth.loginApiUser(userData);
        testAuth.pageWorkHours.doNavigate();

        //выход из системы через UI
        testAuth.logoutUser()
            .checkPageElems();
    });


     //-------------- User ---------------
    it('Вход в систему User', () => {
        userData = creds_from_file.user;
        //логин через UI
        console.log(userData);
        testAuth.loginUser(userData);
    });

    it('Выход из системы User', () => {
        userData = creds_from_file.user;
        //логин через API
        testAuth.loginApiUser(userData);
        testAuth.pageWorkHours.doNavigate();

        //выход из системы через UI
        testAuth.logoutUser()
            .checkPageElems();
    });

});
 
describe('Тест ошибочной авторизации', () => {

    beforeEach(() => {
        localStorage.setItem('sut/onboardingStatus', '{"LaborCostsOnboardingFinished":true}');
    });
    
    let testAuth = new TestSuiteAuthotization;
    let userData;

     //-------------- Негативные проверки ---------------
    it('Вход с пустым логином', () => {
        userData = creds_from_file.user;
        //логин через UI
        console.log(userData);
        testAuth.loginWithoutLogin(userData);
    });
    it('Вход с пустым паролем', () => {
        userData = creds_from_file.user;
        //логин через UI
        console.log(userData);
        testAuth.loginWithoutPassword(userData);
    });
    it('Вход с неправильным логином', () => {
        userData = creds_from_file.wrong_login_user;
        //логин через UI
        console.log(userData);
        testAuth.loginWithWrongCreds(userData);
    });
    it('Вход с неправильным паролем', () => {
        userData = creds_from_file.wrong_password_user;
        //логин через UI
        console.log(userData);
        testAuth.loginWithWrongCreds(userData);
    });
});