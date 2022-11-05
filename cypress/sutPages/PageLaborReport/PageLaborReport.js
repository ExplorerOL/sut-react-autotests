import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import DroverAddLeavePeriod from './DroverAddLeavePeriod.js';

//локаторы страницы
const ADD_ICON = "[data-testid='AddIcon']",
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
    MENU_ADD_LEAVE_PERIOD_ITEMS = "ul[role='menu'][class~='MuiMenu-list']",
    DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE = "Больничный",
    DROPDOWN_LEAVE_PEARIODS_ITEM_PLANNED_PERIOD_TITLE = "Ежегодный отпуск",
    DROPDOWN_LEAVE_PEARIODS_ITEM_ADMINISTRAVIVE_PERIOD_TITLE = "Административный отпуск",
    DROPDOWN_LEAVE_PEARIODS_ITEM_MATERNITY_PERIOD_TITLE = "Декретный отпуск";
//*[@id="__next"]/div/div/div[1]/div[1]/div[2]/div/div[3]/button[2]/span[1]/svg
///html/body/div[1]/div/div/div[1]/div[1]/div[2]/div/div[3]/button[2]/span[1]/svg

export default class PageWorkHours {
    constructor() {
        this.header = new Header;
        this.sidebar = new Sidebar;
        this.menuAddLeavePeriod = null;
        this.droverAddLeavePeriod = new DroverAddLeavePeriod;
        //this.droverAddSickPeriod = new DroverAddSickPeriod();
    }

//элементы страницы
    //кнопка добавления переработок
    getBtnAddOvertimePeriods() {
        //return cy.contains('button', BTN_ADD_OVERTIME_PERIOD_TITLE).find(ADD_ICON);
        return cy.contains('button', BTN_ADD_OVERTIME_PERIOD_TITLE).find(ADD_ICON);
    }
    //кнопка добавления отсутствий
    getBtnAddLeavePeriods() {
        return cy.contains('button', BTN_ADD_LEAVE_PERIOD_TITLE).find(ADD_ICON);
    }
    //кнопка добавления на проект
    getBtnAddProject() {
        return cy.contains('button', BTN_ADD_PROJECT_TITLE).find(ADD_ICON);
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
    
//действия на странице
    //перейти на страницу
    doNavigate() {
        cy.visit("/");
        this.header.getBtnAuthUser().should('exist');
        return this;
    }
    //открыть меню добавления прериода отсутствия
    doOpenMenuAddLeavePeriod() {
        this.getBtnAddLeavePeriods().click();
        this.menuAddLeavePeriod = cy.get(MENU_ADD_LEAVE_PERIOD_ITEMS);
        this.checkMenuLeavePeriodElems();
        return this.menuAddLeavePeriod;

    }
    //открыть дровер добавления больничного
    doOpenDroverAddSickPeriod() {
        this.menuAddLeavePeriod = this.doOpenMenuAddLeavePeriod();
        this.menuAddLeavePeriod.contains(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE)
            .click();
        //let droverAddSickPeriod = new DroverAddLeavePeriod(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE);
        return this.droverAddLeavePeriod.setTitle(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE);

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
        //this.sidebar.checkAdminElemsNotPresentT();
    }
    //проверка элементов лида
    checkLeadElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarItems().should('have.length', 8);
        this.sidebar.getItemAnalytics().should('exist');
        this.sidebar.getItemSummaryResPlan().should('exist');
        this.sidebar.getSidebar().should('not.contain', 'Администрирование');

        //this.sidebar.checkAdminElemsNotPresentLU();
        
    }
    //проверка элементов пользователя
    checkUserElems(userData) {
        this.checkCommonElems(userData);
        this.sidebar.getSidebarItems().should('have.length', 6);
        this.sidebar.getAdminBlockTitle().should('not.exist');

        this.checkAdminElemsNotPresentLU();
    }
    //проверка отсутствия элементов адрминистратора в сайдбаре
    checkAdminElemsNotPresentLU() {
        this.sidebar.getAdminBlockTitle().should('not.exist');
        this.sidebar.getItemAnalytics().should('not.exist');
        this.sidebar.getItemSummaryResPlan().should('not.exist');
        this.sidebar.getItemAdmPrjRoles().should('not.exist');
        this.sidebar.getItemAdmAssignSysRoles().should('not.exist');
        this.sidebar.getItemAdmUsers().should('not.exist');
        this.sidebar.getItemAdmProjects().should('not.exist');
        this.sidebar.getItemAdmSettings().should('not.exist');
        this.sidebar.getItemAdmIntegrations().should('not.exist');
    }
    //проверка отсутствия элементов адрминистратора у тех. ассиста
    checkAdminElemsNotPresentT() {
        this.sidebar.getItemAnalytics().should('not.exist');
        this.sidebar.getItemSummaryResPlan().should('not.exist');
        this.sidebar.getItemAdmPrjRoles().should('not.exist');
        this.sidebar.getItemAdmAssignSysRoles().should('not.exist');
        this.sidebar.getItemAdmUsers().should('not.exist');
        this.sidebar.getItemAdmProjects().should('not.exist');
        this.sidebar.getItemAdmSettings().should('not.exist');
        this.sidebar.getItemAdmIntegrations().should('not.exist');
    }
    //проверка элементов меню добавления больничного
    checkMenuLeavePeriodElems() {
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE);
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_PLANNED_PERIOD_TITLE);
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_ADMINISTRAVIVE_PERIOD_TITLE);
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_MATERNITY_PERIOD_TITLE);
    }
    //проверка элементов меню добавления больничного
    checkMenuLeavePeriodElems() {
        //let menuAddLeavePeriod = this.doOpenMenuAddLeavePeriod();
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE);
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_PLANNED_PERIOD_TITLE);
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_ADMINISTRAVIVE_PERIOD_TITLE);
        this.menuAddLeavePeriod.should('contain.text', DROPDOWN_LEAVE_PEARIODS_ITEM_MATERNITY_PERIOD_TITLE);
    }
}

