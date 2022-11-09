import PageLogin from "../../sut-pages/pageLogin";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/userCreds.json");

describe("Тест авторизации", () => {
    beforeEach(() => {
        cy.viewport(1900, 1200);
    });

    let uname = "";
    let upassword = "";
    let pageLogin = new PageLogin();

    for (let user_obj in creds_from_file) {
        it("Авторизация " + user_obj, () => {
            uname = creds_from_file[user_obj].username;
            upassword = creds_from_file[user_obj].password;
            cy.log("Авторизация пользователя " + uname + ", password: " + upassword);
            let pageLaborReports = pageLogin.doLogin(uname, upassword);

            //ожидание ответов на api
            cy.intercept("/api/leave-periods*").as("getPeriods");
            cy.intercept("/api/labor-reports/**").as("getLaborInfo");
            cy.wait(["@getPeriods", "@getLaborInfo"]).spread(
                (getUsers, getActivities, getComments) => {}
            );
            switch (uname) {
                case "admin": {
                    pageLaborReports.checkAdminElems(uname);
                    break;
                }
                case "assist": {
                    pageLaborReports.checkAssistElems(uname);
                    break;
                }
                case "lead": {
                    pageLaborReports.checkLeadElems(uname);
                    break;
                }
                case "user": {
                    pageLaborReports.checkUserElems(uname);
                    break;
                }
            }
        });
    }

    it("Н. Авторизация без логина", () => {
        upassword = creds_from_file.user.password;
        cy.log("Авторизация пользователя " + "" + ", password: " + upassword);
        pageLogin.doNavigate().doTypeInPassword(upassword).doCLickBtnLogin();
        pageLogin.checkLogoutOk().checkLblLoginIsRequiredVisible();
    });
    it("Н. Авторизация без пароля", () => {
        uname = creds_from_file.user.username;
        cy.log("Авторизация пользователя " + uname + ", password: " + "");
        pageLogin.doNavigate().doTypeInLogin(uname).doCLickBtnLogin();
        pageLogin.checkLogoutOk().checkLblPasswordIsRequiredVisible();
    });
    it("Н. Авторизация c невалидным логином", () => {
        uname = creds_from_file.user.username;
        cy.log("Авторизация пользователя " + uname + ", password: " + "");
        pageLogin.doNavigate().doTypeInLogin(uname).doCLickBtnLogin();
        //pageLogin.checkLogoutOk().checkLblPasswordIsRequiredVisible();
    });
    it("Н. Авторизация c невалидным паролем", () => {
        uname = creds_from_file.user.username;
        cy.log("Авторизация пользователя " + uname + ", password: " + "");
        pageLogin.doNavigate().doTypeInLogin(uname).doTypeInPassword(upassword).doCLickBtnLogin();
        //pageLogin.checkLogoutOk().checkLblPasswordIsRequiredVisible();
    });
});

//--------------------------------------------------------------
// it('Авторизация admin', () => {
//     let urole = creds_from_file.admin;
//     let pageLaborReports = pageLogin.doLogin(urole.username, urole.password);

//     //проверка ответов на api
//     cy.intercept('/api/leave-periods*').as('getPeriods');
//     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
//     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
//                 (getUsers, getActivities, getComments) => {
//                 }
//     );
//     pageLaborReports.checkAdminElems();
// });

// it('Авторизация assist', () => {
//     let urole = creds_from_file.assist;
//     let pageLaborReports = pageLogin.doLogin(urole.username, urole.password);

//     //проверка ответов на api
//     cy.intercept('/api/leave-periods*').as('getPeriods');
//     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
//     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
//                 (getUsers, getActivities, getComments) => {
//                 }
//     );
//     pageLaborReports.checkAssistElems();

// });

// it('Авторизация lead', () => {
//     let urole = creds_from_file.lead;
//     let pageLaborReports = pageLogin.doLogin(urole.username, urole.password);

//     //проверка ответов на api
//     cy.intercept('/api/leave-periods*').as('getPeriods');
//     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
//     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
//                 (getUsers, getActivities, getComments) => {
//                 }
//     );
//     pageLaborReports.checkLeadElems();

// });

// it('Авторизация user', () => {
//     let urole = creds_from_file.user;
//     let pageLaborReports = pageLogin.doLogin(urole.username, urole.password);

//     //проверка ответов на api
//     cy.intercept('/api/leave-periods*').as('getPeriods');
//     cy.intercept('/api/labor-reports/**').as('getLaborInfo');
//     cy.wait(['@getPeriods', '@getLaborInfo']).spread(
//                 (getUsers, getActivities, getComments) => {
//                 }
//     );
//     pageLaborReports.checkUserElems();

// });
//---------------------------------------------------------
// for (let user_obj in creds_from_file) {

//    it('Авторизация ' + user_obj, () => {
//         uname = creds_from_file[user_obj].username;
//         upassword = creds_from_file[user_obj].password;
//         cy.log("Авторизация пользователя " + uname + ", password: " + upassword);
//         let pageLaborReports = pageLogin.doLogin(uname, upassword);

//         //проверка ответов на api
//         cy.intercept('/api/leave-periods*').as('getPeriods');
//         cy.intercept('/api/labor-reports/**').as('getLaborInfo');
//         cy.wait(['@getPeriods', '@getLaborInfo']).spread(
//                  (getUsers, getActivities, getComments) => {
//                  }
//         );

//         //проверка наличия общих разделов на странице Трудозатраты
//         pageLaborReports.checkCommonElems();
//         // header.getBtnAuthUser().contains(uname);
//         // sidebar.getSidebar().should('contain', 'Главная');
//         // sidebar.getBtnWorkingHours().should('exist')
//         // sidebar.getBtnProjects().should('exist');
//         // sidebar.getBtnUsers().should('exist');
//         // sidebar.getBtnLeavePlann().should('exist');
//         // sidebar.getBtnCalendar().should('exist');

//         // pageLaborReports.getTitleTableWorkReport().should('exist');
//         // pageLaborReports.getTitleTableLeavePeriods().should('exist');

//         //проверка отличающихся разделов на странице Трудозатраты в зависимости от системной роли
//         switch (uname) {
//             case "admin": {
//                 pageLaborReports.sidebar.getSidebarListItems().should('have.length', 14);
//                 pageLaborReports.sidebar.getBtnSummaryTable().should('exist');
//                 pageLaborReports.sidebar.getBtnSummaryPlan().should('exist');

//                 pageLaborReports.sidebar.getAdminBlock().should('contain', 'Администрирование');
//                 pageLaborReports.sidebar.getBtnAPrjRoles().should('exist');
//                 pageLaborReports.sidebar.getBtnASetPrjRoles().should('exist');
//                 pageLaborReports.sidebar.getBtnAUsers().should('exist');
//                 pageLaborReports.sidebar.getBtnAProjects().should('exist');
//                 pageLaborReports.sidebar.getBtnASettings().should('exist');
//                 break;
//             }
//             case "assist": {
//                 pageLaborReports.sidebar.getSidebarListItems().should('have.length', 8);
//                 pageLaborReports.sidebar.getBtnSummaryTable().should('exist');
//                 pageLaborReports.sidebar.getBtnSummaryPlan().should('exist');
//                 pageLaborReports.sidebar.getSidebar().should('not.contain', 'Администрирование');
//                 break;
//             }
//             case "lead": {
//                 pageLaborReports.sidebar.getSidebarListItems().should('have.length', 7);
//                 pageLaborReports.sidebar.getBtnSummaryTable().should('exist');
//                 pageLaborReports.sidebar.getBtnSummaryPlan().should('not.exist');
//                 pageLaborReports.sidebar.getSidebar().should('not.contain', 'Администрирование');
//             break;
//             }
//             case "user": {
//                 pageLaborReports.sidebar.getSidebarListItems().should('have.length', 6);
//                 pageLaborReports.sidebar.getBtnSummaryTable().should('not.exist');
//                 pageLaborReports.sidebar.getBtnSummaryPlan().should('not.exist');
//                 pageLaborReports.sidebar.getSidebar().should('not.contain', 'Администрирование');
//                 break;
//             }
//         };
//         //let header = new Header;
//         pageLaborReports.header.doLogout();
//     });

// }
