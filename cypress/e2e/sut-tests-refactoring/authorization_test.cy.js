import PageLogin from "../../sut-pages/pageLogin";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe('Тест авторизации', () => {

    beforeEach(() => {
        cy.viewport(1900, 1200);
    });
    
    let uname = "";
    let upassword = "";
    let pageLogin = new PageLogin;

    for (let user_obj in creds_from_file) {

        it('Авторизация ' + user_obj, () => {
            uname = creds_from_file[user_obj].username;
            upassword = creds_from_file[user_obj].password;
            cy.log("Авторизация пользователя " + uname + ", password: " + upassword);
            let pageWorkHours = pageLogin.doLogin(uname, upassword);

            //ожидание ответов на api
            cy.intercept('/api/leave-periods*').as('getPeriods');
            cy.intercept('/api/labor-reports/**').as('getLaborInfo');
            cy.wait(['@getPeriods', '@getLaborInfo']).spread(
                        (getUsers, getActivities, getComments) => {
                        }
            );
            switch (uname) {
                case "admin": {
                    pageWorkHours.checkAdminElems(uname);
                break;
                }
                case "assist": {
                    pageWorkHours.checkAssistElems(uname);
                break;
                }
                case "lead": {
                    pageWorkHours.checkLeadElems(uname);
                break;
                }
                case "user": {
                    pageWorkHours.checkUserElems(uname);
                break;
                }
            }
        });
    }

    it('Н. Авторизация без логина', () => {
        upassword = creds_from_file.user.password;
        cy.log("Авторизация пользователя " + "" + ", password: " + upassword);
        pageLogin.doNavigate().doTypeInPassword(upassword).doCLickBtnLogin();
        pageLogin.checkLogoutOk().checkLblLoginIsRequiredVisible();
    });
    it('Н. Авторизация без пароля', () => {
        uname = creds_from_file.user.username;
        cy.log("Авторизация пользователя " + uname + ", password: " + "");
        pageLogin.doNavigate().doTypeInLogin(uname).doCLickBtnLogin();
        pageLogin.checkLogoutOk().checkLblPasswordIsRequiredVisible();
    });
    it('Н. Авторизация c невалидным логином', () => {
        uname = creds_from_file.user.username;
        cy.log("Авторизация пользователя " + uname + ", password: " + "");
        pageLogin.doNavigate().doTypeInLogin(uname).doCLickBtnLogin();
        //pageLogin.checkLogoutOk().checkLblPasswordIsRequiredVisible();
    });
    it('Н. Авторизация c невалидным паролем', () => {
        uname = creds_from_file.user.username;
        cy.log("Авторизация пользователя " + uname + ", password: " + "");
        pageLogin.doNavigate().doTypeInLogin(uname).doTypeInPassword(upassword).doCLickBtnLogin();
        //pageLogin.checkLogoutOk().checkLblPasswordIsRequiredVisible();
    });


});


//--------------------------------------------------------------
    // it('Авторизация admin', () => {
    //     let urole = creds_from_file.admin;
    //     let pageWorkHours = pageLogin.doLogin(urole.username, urole.password);

    //     //проверка ответов на api
    //     cy.intercept('/api/leave-periods*').as('getPeriods');
    //     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
    //     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
    //                 (getUsers, getActivities, getComments) => {
    //                 }
    //     );
    //     pageWorkHours.checkAdminElems();
    // });

    // it('Авторизация assist', () => {
    //     let urole = creds_from_file.assist;
    //     let pageWorkHours = pageLogin.doLogin(urole.username, urole.password);

    //     //проверка ответов на api
    //     cy.intercept('/api/leave-periods*').as('getPeriods');
    //     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
    //     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
    //                 (getUsers, getActivities, getComments) => {
    //                 }
    //     );
    //     pageWorkHours.checkAssistElems();

    // });

    // it('Авторизация lead', () => {
    //     let urole = creds_from_file.lead;
    //     let pageWorkHours = pageLogin.doLogin(urole.username, urole.password);

    //     //проверка ответов на api
    //     cy.intercept('/api/leave-periods*').as('getPeriods');
    //     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
    //     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
    //                 (getUsers, getActivities, getComments) => {
    //                 }
    //     );
    //     pageWorkHours.checkLeadElems();

    // });

    // it('Авторизация user', () => {
    //     let urole = creds_from_file.user;
    //     let pageWorkHours = pageLogin.doLogin(urole.username, urole.password);

    //     //проверка ответов на api
    //     cy.intercept('/api/leave-periods*').as('getPeriods');
    //     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
    //     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
    //                 (getUsers, getActivities, getComments) => {
    //                 }
    //     );
    //     pageWorkHours.checkUserElems();

    // });
    //---------------------------------------------------------
    // for (let user_obj in creds_from_file) {

    //    it('Авторизация ' + user_obj, () => {
    //         uname = creds_from_file[user_obj].username;
    //         upassword = creds_from_file[user_obj].password;
    //         cy.log("Авторизация пользователя " + uname + ", password: " + upassword);
    //         let pageWorkHours = pageLogin.doLogin(uname, upassword);

    //         //проверка ответов на api
    //         cy.intercept('/api/leave-periods*').as('getPeriods');
    //         cy.intercept('/api/labor-reports/**').as('getLaborInfo');
    //         cy.wait(['@getPeriods', '@getLaborInfo']).spread(
    //                  (getUsers, getActivities, getComments) => {
    //                  }
    //         );

    //         //проверка наличия общих разделов на странице Трудозатраты
    //         pageWorkHours.checkCommonElems();
    //         // header.getBtnAuthUser().contains(uname);
    //         // sidebar.getSidebar().should('contain', 'Главная');
    //         // sidebar.getBtnWorkingHours().should('exist')
    //         // sidebar.getBtnProjects().should('exist');
    //         // sidebar.getBtnUsers().should('exist');
    //         // sidebar.getBtnLeavePlann().should('exist');
    //         // sidebar.getBtnCalendar().should('exist');

    //         // pageWorkHours.getTitleTableWorkReport().should('exist');
    //         // pageWorkHours.getTitleTableLeavePeriods().should('exist');

    //         //проверка отличающихся разделов на странице Трудозатраты в зависимости от системной роли
    //         switch (uname) {
    //             case "admin": {
    //                 pageWorkHours.sidebar.getSidebarListItems().should('have.length', 14);
    //                 pageWorkHours.sidebar.getBtnSummaryTable().should('exist');
    //                 pageWorkHours.sidebar.getBtnSummaryPlan().should('exist');
                    
    //                 pageWorkHours.sidebar.getAdminBlock().should('contain', 'Администрирование');
    //                 pageWorkHours.sidebar.getBtnAPrjRoles().should('exist');
    //                 pageWorkHours.sidebar.getBtnASetPrjRoles().should('exist');
    //                 pageWorkHours.sidebar.getBtnAUsers().should('exist');
    //                 pageWorkHours.sidebar.getBtnAProjects().should('exist');
    //                 pageWorkHours.sidebar.getBtnASettings().should('exist');
    //                 break;
    //             }
    //             case "assist": {
    //                 pageWorkHours.sidebar.getSidebarListItems().should('have.length', 8);
    //                 pageWorkHours.sidebar.getBtnSummaryTable().should('exist');
    //                 pageWorkHours.sidebar.getBtnSummaryPlan().should('exist');
    //                 pageWorkHours.sidebar.getSidebar().should('not.contain', 'Администрирование');
    //                 break;
    //             }
    //             case "lead": {
    //                 pageWorkHours.sidebar.getSidebarListItems().should('have.length', 7);
    //                 pageWorkHours.sidebar.getBtnSummaryTable().should('exist');
    //                 pageWorkHours.sidebar.getBtnSummaryPlan().should('not.exist');
    //                 pageWorkHours.sidebar.getSidebar().should('not.contain', 'Администрирование');
    //             break;
    //             }
    //             case "user": {
    //                 pageWorkHours.sidebar.getSidebarListItems().should('have.length', 6);
    //                 pageWorkHours.sidebar.getBtnSummaryTable().should('not.exist');
    //                 pageWorkHours.sidebar.getBtnSummaryPlan().should('not.exist');
    //                 pageWorkHours.sidebar.getSidebar().should('not.contain', 'Администрирование');
    //                 break;
    //             }
    //         };
    //         //let header = new Header;
    //         pageWorkHours.header.doLogout();
    //     });


    // }

  




        
   