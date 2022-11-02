import PageLogin from "../sutPages/pageLogin";
import PageWorkHours from "../sutPages/pageWorkHours";

//const stand_url = require("../fixtures/stand_url.json");

export default class TestSuiteAuthotization{
    constructor() {
        this.pageLogin = new PageLogin;
        this.pageWorkHours = new PageWorkHours;
    }

    loginUser(userData) {
        this.pageWorkHours = this.pageLogin.doLogin(userData);

        switch (userData.sysRole) {
            case "admin": {
                this.pageWorkHours.checkAdminElems(userData);
            break;
            }
            case "tech_assist": {
                this.pageWorkHours.checkAssistElems(userData);
            break;
            }
            case "lead": {
                this.pageWorkHours.checkLeadElems(userData);
            break;
            }
            case "user": {
                this.pageWorkHours.checkUserElems(userData);
            break;
            }
        }
        return this.pageWorkHours;

    }

    loginWithoutLogin(userData) {
        this.pageLogin.doNavigate()
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblLoginIsRequiredVisible();
    }
    loginWithoutPassword(userData) {
        this.pageLogin.doNavigate()
            .doTypeInLogin(userData.username)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblPasswordIsRequiredVisible();
    }
    loginWithWrongCreds(userData) {
        this.pageLogin.doNavigate()
            .doTypeInLogin(userData.username)
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin()
            .checkPageElems()
            .checkLblWrongLoginOrPasswordVisible();
    }


    logoutUser() {
        return this.pageWorkHours.header.doLogout();
    }
    loginApiUser(userData) {
        return this.pageLogin.doApiLogin(userData);
    }


}