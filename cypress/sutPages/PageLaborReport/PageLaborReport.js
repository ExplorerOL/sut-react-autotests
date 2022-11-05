import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import DroverAddSickPeriod from './DroverAddLeavePeriod.js';

//локаторы страницы
const ADD_ICON_ID = "[data-testid='AddIcon']",
    ARROW_DROP_DOWN_ID = "[data-testid='ArrowDropDownIcon']",
    CHEVRON_LEFT_ID = "[data-testid='ChevronLeftIcon']",
    CHEVRON_RIGHT_ID = "[data-testid='ChevronRightIcon']",



    
    BTN_ADD_PROJECT_TITLE = 'Проект',
    BTN_ADD_OVERTIME_PERIOD_TITLE = 'Переработка',
    BTN_ADD_LEAVE_PERIOD_TITLE = "Отсутствие",

    BTN_SAVE_WORKING_HOURS = "//button[.='Сохранить']",
    BTN_CANCEL_WORKING_HOURS = "//button[.='Отмена']",
    TABLE_WORK_HOURS_TITLE = "//h4[.='Отчет трудозатрат']",
    TABLE_LEAVE_PERIODS_TITLE = "//h4[.='Отсутствие']",
    TABLE_LEAVE_PERIODS = ".ag-center-cols-container",
    DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD = "//p[.='Больничный']";
//*[@id="__next"]/div/div/div[1]/div[1]/div[2]/div/div[3]/button[2]/span[1]/svg
///html/body/div[1]/div/div/div[1]/div[1]/div[2]/div/div[3]/button[2]/span[1]/svg

export default class PageWorkHours {
    constructor() {
        this.header = new Header;
        this.sidebar = new Sidebar;
        //this.droverAddSickPeriod = new DroverAddSickPeriod();
    }

//элементы страницы
    //кнопка добавления переработок
    getBtnAddOvertimePeriods() {
        return cy.contains('button', BTN_ADD_OVERTIME_PERIOD_TITLE).find(ADD_ICON_ID);
    }
    //кнопка добавления отсутствий
    getBtnAddLeavePeriods() {
        return cy.contains('button', BTN_ADD_LEAVE_PERIOD_TITLE).find(ADD_ICON_ID);
    }
    //кнопка добавления на проект
    getBtnAddProject() {
        return cy.contains('button', BTN_ADD_PROJECT_TITLE).find(ADD_ICON_ID);
    }
    //кнопка сохранения рабочих часов
    getBtnSaveWorkingHours() {
        return cy.xpath(BTN_SAVE_WORKING_HOURS);
    }
    //кнопка сохранения рабочих часов
    getBtnCancelWorkingHours() {
        return cy.xpath(BTN_CANCEL_WORKING_HOURS);
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
    getDropdownLeavePeriods() {

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
        this.getDropdownLeavePeriodItemsSickPeriod().click();
        return this.droverAddSickPeriod;
    }
    //проверка общих для всех пользователей элементов страницы
    checkCommonElems(userData) {
        this.header.getBtnAuthUser().contains(userData.username);
        this.sidebar.getMainBlockTitle().should('exist');
        this.sidebar.getItemLaborReport().should('exist')
        this.sidebar.getItemProjects().should('exist');
        this.sidebar.getItemUsers().should('exist');
        this.sidebar.getItemLeavePlan().should('exist');
        this.sidebar.getItemCalendar().should('exist');
        this.getTableWorkReportTitle().should('exist');
        this.getTableLeavePeriodsTitle().should('exist');
        this.getBtnAddProject().should('exist');
        this.getBtnAddOvertimePeriods().should('exist');
        this.getBtnAddLeavePeriods().should('exist');
        this.getBtnCancelWorkingHours().should('exist');
        this.getBtnSaveWorkingHours().should('exist');
        return this;        
    }
    //проверка элементов администратора
    checkAdminElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarItems().should('have.length', 15);
        this.sidebar.getAdminBlockTitle().should('exist');
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemSummaryResPlan().should('exist');
        this.sidebar.getItemAdmPrjRoles().should('exist');
        this.sidebar.getItemAdmAssignSysRoles().should('exist');
        this.sidebar.getItemAdmUsers().should('exist');
        this.sidebar.getItemAdmProjects().should('exist');
        this.sidebar.getItemAdmSettings().should('exist');
        this.sidebar.getItemAdmIntegrations().should('exist');
        //this.sidebar.getItemAdmAffiliates().should('exist');
        //this.sidebar.getItemAdmKkPersonalQualities().should('exist');
    }
    //проверка элементов тех ассистента
    checkTechAssistElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarItems().should('have.length', 9);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemAnalytics().should('exist');

        this.sidebar.getAdminBlockTitle().should('exist');
        this.sidebar.getItemAdmLogs().should('exist');
        this.sidebar.checkAdminElemsNotPresentT();
    }
    //проверка элементов лида
    checkLeadElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarItems().should('have.length', 8);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemSummaryResPlan().should('exist');
        this.sidebar.getSidebar().should('not.contain', 'Администрирование');

        this.sidebar.checkAdminElemsNotPresentLU();
        
    }
    //проверка элементов пользователя
    checkUserElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarItems().should('have.length', 6);
        this.sidebar.getAdminBlockTitle().should('not.exist');

        this.sidebar.checkAdminElemsNotPresentLU();
    }
}

