import PageLogin from "../sutPages/PageLogin";
import PageWorkHours from "../sutPages/PageLaborReport/PageLaborReport";

export default class TestSuiteAuthotization{
    constructor() {
        this.pageLogin = new PageLogin;
        this.pageWorkHours = new PageWorkHours;
    }
    //войти в систему с данными пользователя
    loginUser(userData) {
        this.pageWorkHours = this.pageLogin.doLogin(userData);

        this.pageWorkHours.header.checkElems(userData);
        this.pageWorkHours.sidebar.checkElems(userData);
        this.pageWorkHours.checkElems();

        return this.pageWorkHours;
    }
    //войти в систему не заполняя логин
    loginWithoutLogin(userData) {
        this.pageLogin.doNavigate()
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblLoginIsRequiredVisible();
    }
    //войти в систему не заполняя пароль
    loginWithoutPassword(userData) {
        this.pageLogin.doNavigate()
            .doTypeInLogin(userData.username)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblPasswordIsRequiredVisible();
    }
    //войти в систему с неверными логином или паролем
    loginWithWrongCreds(userData) {
        this.pageLogin.doNavigate()
            .doTypeInLogin(userData.username)
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblWrongLoginOrPasswordVisible();
    }

    //выйти из системы через UI
    logoutUser() {
        return this.pageWorkHours.header.doLogout();
    }
}