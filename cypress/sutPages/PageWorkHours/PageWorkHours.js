import Header from '../Header.js';
import Sidebar from '../Sidebar.js';

//локаторы страницы
const BTN_ADD_LEAVE_PERIOD = "//button[.='Отсутствие']",
    BTN_SAVE_WORKING_HOURS = "//button[.='Сохранить']",
    TABLE_WORK_HOURS_TITLE = "//h4[.='Отчет трудозатрат']",
    TABLE_LEAVE_PERIODS_TITLE = "//h4[.='Отсутствие']",
    TABLE_LEAVE_PERIODS = ".ag-center-cols-container",
    DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD = "//p[.='Больничный']";


export default class PageWorkHours {
    constructor() {
        this.header = new Header;
        this.sidebar = new Sidebar;
    }

//элементы страницы
    //кнопка добавления отсутствий
    getBtnAddLeavePeriods() {
        return cy.xpath(BTN_ADD_LEAVE_PERIOD);
    }
    //кнопка сохранения рабочих часов
    getBtnSaveWorkingHours() {
        return cy.xpath(BTN_SAVE_WORKING_HOURS);
    }
    //название таблицы трудозатрат
    getTableWorkReportTitle() {
        return cy.xpath(TABLE_WORK_HOURS_TITLE);
    }
    //название раздела с отсутствиями
    getTableLeavePeriodsTitle() {
        return cy.xpath(TABLE_LEAVE_PERIODS_TITLE);
    }
    //таблица отсутствий
    getTableLeavePeriods() {
        return cy.get(TABLE_LEAVE_PERIODS);
    }
    //пункт Больничный отпуск в выпадающем списке
    getDropdownLeavePeriodItemsSickPeriod() {
        return cy.xpath(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD);
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
        this.getDropdownLeavePeriodsSickPeriod().click();
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
        this.getTableWorkReportTitle().should('exist');
        this.getTableLeavePeriodsTitle().should('exist');
        return this;        
    }
    //проверка элементов администратора
    checkAdminElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 15);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemSummaryResPlan().should('exist');
        this.sidebar.getAdminBlock().should('contain', 'Администрирование');
        this.sidebar.getItemAdmPrjRoles().should('exist');
        this.sidebar.getItemAdmSetPrjRoles().should('exist');
        this.sidebar.getItemAdmUsers().should('exist');
        this.sidebar.getItemAdmProjects().should('exist');
        this.sidebar.getItemAdmSettings().should('exist');
        //this.sidebar.getItemAdmIntegrations().should('exist');
        //this.sidebar.getItemAdmAffiliates().should('exist');
        //this.sidebar.getItemAdmKkPersonalQualities().should('exist');
    }
    //проверка элементов тех ассистента
    checkAssistElems(userData) {
        console.log("2" + userData);
        this.checkCommonElems(userData);
        this.sidebar.getSidebarListItems().should('have.length', 9);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getSidebar().should('contain', 'Администрирование');
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemAdmLogs().should('exist');
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

