/// <reference types="cypress" />

import Header from "../../sut-pages/header";
import Sidebar from "../../sut-pages/sidebar";
import PageLogin from "../../sut-pages/pageLogin";

//файл с набором валидных учетных записей
const creds_from_file = require("../../fixtures/validUserCreds");

describe("Добавление/удаление больничного листа", () => {
    beforeEach(() => {
        cy.viewport(1900, 1200);
    });

    let uname = "";
    let upassword = "";

    for (let user_obj in creds_from_file) {
        console.log(creds_from_file[user_obj]);

        it("Добавление/удаление больничного листа " + creds_from_file[user_obj].username, () => {
            uname = creds_from_file[user_obj].username;
            upassword = creds_from_file[user_obj].password;
            let pageLaborReports = pageLogin.doLogin(uname, upassword);

            cy.intercept("/api/leave-periods*").as("getPeriods");
            cy.intercept("/api/labor-reports/**").as("getLaborInfo");
            cy.wait(["@getPeriods", "@getLaborInfo"]).spread(
                (getUsers, getActivities, getComments) => {
                    // each interception is now an individual argument
                }
            );

            //проверка, что больничных нет в таблицы
            pageLaborReports.getLeavePeriodsList().should("not.contain", "Больничный");

            //открытие дровера добавления больничного
            let droverAddSickPeriod = pageLaborReports.doOpenDroverAddSickPeriod();
            droverAddSickPeriod.getTitle().should("have.text", "Больничный");

            droverAddSickPeriod.getIconCaledarStartDate().click();
            cy.get(".OkPYM > :nth-child(2)").click();
            cy.get('.sc-crXcEl > [tabindex="0"] > .sc-gsnTZi').contains("Больничный").click();
            cy.get(".RHiyQ > .sc-gsnTZi").contains("Больничный").should("exist");

            //выбор даты больничного
            cy.get(
                ':nth-child(2) > .sc-gicCDI > .sc-fmrZth > .sc-papXJ > [data-testid="CalendarIcon"]'
            ).click();
            cy.get(":nth-child(3) > :nth-child(1) > .sc-papXJ").click();

            cy.get(
                ':nth-child(2) > .sc-gicCDI > .sc-fmrZth > .sc-papXJ > [data-testid="CalendarIcon"]'
            ).click();
            cy.get(":nth-child(4) > :nth-child(7) > .sc-papXJ").last().click();

            //сохранение больничного
            cy.get(".bBrLwH > .sc-bczRLJ > .MuiButton-contained").click();
            //проверка закрытия дровера
            cy.get(".RHiyQ > .sc-gsnTZi").contains("Больничный").should("not.exist");

            //проверка наличия больничного в таблице
            cy.get(".sc-TRNrF > :nth-child(2)").should("contain", "Больничный");
            cy.get(":nth-child(1) > .evkFjt > .sc-djUGQo").should("contain", "Б");

            //удаление больничного
            cy.get('[data-testid="ClearIcon"]').click();
            cy.get(".fKPhjt > .dpRLKE > .MuiButton-contained").click();
            //проверка, что больничный отсутствует в таблице
            cy.get(".sc-TRNrF > :nth-child(2)").should("not.contain", "Больничный");
            //выход из системы
            header.doLogout();
        });
    }
});
