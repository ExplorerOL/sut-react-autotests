/// <reference types="cypress" />

import header from "../sut-pages/header";
import sidebar from "../sut-pages/sidebar";
import pageLogin from "../sut-pages/pageLogin";

//файл с набором валидных учетных записей
const creds_from_file = require("../fixtures/userCreds.json");

describe('Добавление/удаление больничного листа', () => {
    beforeEach(() => {
        cy.viewport(1900, 1200);
    });
    
    let uname = "";
    let upassword = "";

    //for (let user_obj in creds_from_file) {
        console.log(creds_from_file.user);

        it('Добавление/удаление больничного листа ' + creds_from_file.user.username, () => {
            uname = creds_from_file.user.username;
            upassword = creds_from_file.user.password;
            pageLogin.doLogin(uname, upassword);

            header.getLogo();
            header.doLogout();

    });

    //    }

})