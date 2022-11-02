//import header from "./header";
import Header from './Header.js';
import Sidebar from './Sidebar.js';
//import droverAddSickPeriod from "./droverAddSickPeriod";

//const stand_url = require("../fixtures/stand_url.json");
export default class PageWorkHours {
    constructor() {
        this.header = new Header;
        this.sidebar = new Sidebar;
    }

    //элементы страницы
    getBtnAddLeavePeriods() {
        return cy.xpath("//button[.='Отсутствие']");
    }
    getBtnSaveWorkingHours() {
        return cy.xpath("//button[.='Сохранить']");
    }
    getTitleTableWorkReport() {
        return cy.xpath("//h4[.='Отчет трудозатрат']");
        }
    getTitleTableLeavePeriods() {
        return cy.xpath("//h4[.='Отсутствие']");
    }
    getLeavePeriodsList() {
        return cy.get(".ag-center-cols-container");
    }

    getDropItemSickPeriod() {
        return cy.xpath("//p[.='Больничный']");
    }
    
    //действия на странице
    doNavigate() {
        cy.visit("/");
        this.header.getBtnAuthUser().should('exist');
        return this;
    }
    doOpenDroverAddSickPeriod() {
        this.getBtnAddLeavePeriods().click();
        this.getDropItemSickPeriod().click();
        return droverAddSickPeriod;
    }

    checkCommonElems(userData) {
        //проверка наличия общих разделов на странице Трудозатраты
        console.log("3" + userData.username);
        this.header.getBtnAuthUser().contains(userData.username);
        this.sidebar.getSidebar().should('contain', 'Главная');
        this.sidebar.getBtnWorkingHours().should('exist')
        this.sidebar.getBtnProjects().should('exist');
        this.sidebar.getBtnUsers().should('exist');
        this.sidebar.getBtnLeavePlan().should('exist');
        this.sidebar.getBtnCalendar().should('exist');
        this.getTitleTableWorkReport().should('exist');
        this.getTitleTableLeavePeriods().should('exist');
        return this;        
    }
    checkAdminElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 15);
        this.sidebar.getBtnAnalytics().should('exist');
        this.sidebar.getBtnSummaryPlan().should('exist');
        this.sidebar.getAdminBlock().should('contain', 'Администрирование');
        this.sidebar.getBtnAPrjRoles().should('exist');
        this.sidebar.getBtnASetPrjRoles().should('exist');
        this.sidebar.getBtnAUsers().should('exist');
        this.sidebar.getBtnAProjects().should('exist');
        this.sidebar.getBtnASettings().should('exist');
    }
    checkAssistElems(userData) {
        console.log("2" + userData);
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 9);
        this.sidebar.getBtnAnalytics().should('exist');
        this.sidebar.getSidebar().should('contain', 'Администрирование');
    }
    checkLeadElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 8);
        this.sidebar.getBtnAnalytics().should('exist');
        this.sidebar.getBtnSummaryPlan().should('exist');
        this.sidebar.getSidebar().should('not.contain', 'Администрирование');
        
    }
    checkUserElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 6);
        this.sidebar.getBtnAnalytics().should('not.exist');
        this.sidebar.getBtnSummaryPlan().should('not.exist');
        this.sidebar.getSidebar().should('not.contain', 'Администрирование');
        
    }

}

//module.exports = new PageWorkHours();
