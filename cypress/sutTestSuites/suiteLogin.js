import PageLogin from "../sutPages/PageLogin";
import PageLaborReports from "../sutPages/PageLaborReports/PageLaborReports";

export default class TestSuiteAuthotization {
    constructor() {
        this.pageLogin = new PageLogin();
        this.pageLaborReports = new PageLaborReports();
    }
    //войти в систему с данными пользователя
    loginUser(userData) {
        this.pageLaborReports = this.pageLogin.doLogin(userData);

        this.pageLaborReports.header.checkElems(userData);
        this.pageLaborReports.sidebar.checkElems(userData);
        this.pageLaborReports.checkElems();

        return this.pageLaborReports;
    }
    //войти в систему не заполняя логин
    loginWithoutLogin(userData) {
        this.pageLogin
            .doNavigate()
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblLoginIsRequiredVisible();
    }
    //войти в систему не заполняя пароль
    loginWithoutPassword(userData) {
        this.pageLogin
            .doNavigate()
            .doTypeInLogin(userData.username)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblPasswordIsRequiredVisible();
    }
    //войти в систему с неверными логином или паролем
    loginWithWrongCreds(userData) {
        this.pageLogin
            .doNavigate()
            .doTypeInLogin(userData.username)
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblWrongLoginOrPasswordVisible();
    }

    //выйти из системы через UI
    logoutUser() {
        return this.pageLaborReports.header.doLogout();
    }

    //вспомогательные методы проверок
    //проверка имени пользователя в правом верхнем улгу страницы
    checkSidebarElems(userData) {
        this.pageLaborReports.getBtnAuthUser().contains(userData.username);
        return this;
    }
}
