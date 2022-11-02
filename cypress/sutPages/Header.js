import PageLogin from "./PageLogin";

const BTN_AUTH_USER = "button[class*='MuiButton-disableElevation']",
    ICON_AUTH_USER = '[data-testid="PersonIcon"]',
    LOGO = "//a[@href='/']",
    AUTH_USER_MENU_LOGOUT = "//li[.='Выйти']";

export default class Header {
    //элементы страницы
    getBtnAuthUser() {
        return cy.get(BTN_AUTH_USER);
    }
    getIconAuthUser() {
        return cy.get(ICON_AUTH_USER);
    }
    getLogo() {
        return cy.xpath(LOGO);
    }
    getAuthUserMenuLogout() {
        return cy.xpath(AUTH_USER_MENU_LOGOUT);
    }


    //действия на странице
    doLogout() {
        cy.log("Выход из системы");
        if (this.getIconAuthUser()) {
            this.getIconAuthUser().click();
            this.getAuthUserMenuLogout().click();
        }
        let pageLogin = new PageLogin;
        return pageLogin;
    }
    doLogoutApi() {
        cy.request({
            method: 'DELETE',
            url: stand_url.url + '/api/login/' + cy.getCookie('auth_token'),
        }).then(function (response) {
            expect(response.status).to.eq(204);
            let pageLogin = new PageLogin;
            return pageLogin;
        });
    }
}

//module.exports = new Header();