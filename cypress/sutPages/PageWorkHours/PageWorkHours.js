import Header from '../Header.js';
import Sidebar from '../Sidebar.js';


export default class PageWorkHours {
    constructor() {
        this.header = new Header;
        this.sidebar = new Sidebar;
    }

//элементы страницы
    //кнопка добавления отсутствий
    getBtnAddLeavePeriods() {
        return cy.xpath("//button[.='Отсутствие']");
    }
    //кнопка сохранения рабочих часов
    getBtnSaveWorkingHours() {
        return cy.xpath("//button[.='Сохранить']");
    }
    //название таблицы трудозатрат
    getTitleTableWorkReport() {
        return cy.xpath("//h4[.='Отчет трудозатрат']");
    }
    //название раздела с отсутствиями
    getTitleTableLeavePeriods() {
        return cy.xpath("//h4[.='Отсутствие']");
    }
    //таблица отсутствий
    getLeavePeriodsList() {
        return cy.get(".ag-center-cols-container");
    }
    //пункт Больничный отпуск в выпадающем списке
    getDropItemSickPeriod() {
        return cy.xpath("//p[.='Больничный']");
    }
    
//действия на странице
    //перейти на страницу
    doNavigate() {
        cy.visit("/");
        this.header.getBtnAuthUser().should('exist');
        return this;
    }
    //открыть дровер добавления больничного
    doOpenDroverAddSickPeriod() {
        this.getBtnAddLeavePeriods().click();
        this.getDropItemSickPeriod().click();
        return droverAddSickPeriod;
    }
    //проверка общих для всех пользователей элементов страницы
    checkCommonElems(userData) {
        this.header.getBtnAuthUser().contains(userData.username);
        this.sidebar.getSidebar().should('contain', 'Главная');
        this.sidebar.getItemWorkingHours().should('exist')
        this.sidebar.getItemProjects().should('exist');
        this.sidebar.getItemUsers().should('exist');
        this.sidebar.getItemLeavePlan().should('exist');
        this.sidebar.getItemCalendar().should('exist');
        this.getTitleTableWorkReport().should('exist');
        this.getTitleTableLeavePeriods().should('exist');
        return this;        
    }
    //проверка элементов администратора
    checkAdminElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 15);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemSummaryResPlan().should('exist');
        this.sidebar.getAdminBlock().should('contain', 'Администрирование');
        this.sidebar.getItemAPrjRoles().should('exist');
        this.sidebar.getItemASetPrjRoles().should('exist');
        this.sidebar.getItemAUsers().should('exist');
        this.sidebar.getItemAProjects().should('exist');
        this.sidebar.getItemASettings().should('exist');
    }
    //проверка элементов тех ассистента
    checkAssistElems(userData) {
        console.log("2" + userData);
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 9);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getSidebar().should('contain', 'Администрирование');
    }
    //проверка элементов лида
    checkLeadElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 8);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemSummaryResPlan().should('exist');
        this.sidebar.getSidebar().should('not.contain', 'Администрирование');
        
    }
    //проверка элементов пользователя
    checkUserElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 6);
        this.sidebar.getItemAnalytics().should('not.exist');
        this.sidebar.getItemSummaryResPlan().should('not.exist');
        this.sidebar.getSidebar().should('not.contain', 'Администрирование');
    }
}

