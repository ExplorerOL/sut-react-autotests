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
    DROPDOWN_LEAVE_PEARIODS_ITEM_MATERNITY_PERIOD_TITLE = "Декретный отпуск",
    //элементы таблицы Трудозатраты
    TABLE_LABOR_REPORTS_ROWS_WITH_PROJECTS = 'div[class~="ag-row-first"][row-id="row-group-0"]',
    TABLE_LABOR_REPORTS_ROW_TOTAL = 'div[class~="ag-floating-bottom-viewport"][role="presentation"]',
    TABLE_LABOR_REPORTS_FIRST_ROW_1DAY_CELL = 'div[class~="ag-row-first"][row-id="row-group-0"] div[class~="ag-cell-value"][role="gridcell"][aria-colindex="3"]',
    TABLE_LABOR_REPORTS_FIRST_ROW_CELLS = 'div[row-id="row-group-0"] div[class~="cell-dates"][role="gridcell"]',
    TABLE_LABOR_REPORTS_TOTAL_ROW_CELLS = 'div[row-index="b-0"][row-id="b-0"] div[class~="cell-dates"][role="gridcell"]',

    //элементы таблицы Отсутствия
    TABLE_LEAVE_PERIODS_LAST_LEAVE_TYPE_CELL = 'div[role="gridcell"][col-id="0"]';


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
    //строки с проектами таблицы турдозатрат
    getTableLaborReportRowsWithProjects() {
        return cy.get(TABLE_LABOR_REPORTS_ROWS_WITH_PROJECTS);
    }
    //строка Итого таблицы трудозатрат
    getTableLaborReportRowTotal() {
        return cy.get(TABLE_LABOR_REPORTS_ROW_TOTAL);
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
        cy.intercept('/api/leave-periods*').as('getPeriods');
        cy.intercept('/api/labor-reports/**/*').as('getLaborInfo');
        cy.visit("/");
        this.header.getBtnAuthUser().should('exist');
        return this;
    }
    doWaitForApiResponse() {
        // //cy.intercept('/api/leave-periods').as('getLeavePeriods');
        // cy.intercept('/api/labor-reports/**').as('getLaborReports');
        // //cy.wait('@getLeavePeriods');
        // cy.wait('@getLaborReports');
                    //ожидание ответов на api
            //cy.visit("/");
        cy.wait(['@getPeriods', '@getLaborInfo']).spread(
                    (getUsers, getActivities, getComments) => {
                    }
        );

    }
    //открыть меню добавления прериода отсутствия
    doOpenMenuAddLeavePeriod() {
        this.getBtnAddLeavePeriods().click();
        this.menuAddLeavePeriod = cy.get(MENU_ADD_LEAVE_PERIOD_ITEMS);
        return this.menuAddLeavePeriod;

    }
    //проверка элементов на странице
    checkElems() {
        this.getTableWorkReportTitle().should('exist');
        this.getTableLeavePeriodsTitle().should('exist');
    }
    //открыть дровер добавления больничного
    doOpenDroverAddSickPeriod() {
        this.menuAddLeavePeriod = this.doOpenMenuAddLeavePeriod();
        this.menuAddLeavePeriod.contains(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE)
            .click();
        //let droverAddSickPeriod = new DroverAddLeavePeriod(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE);
        return this.droverAddLeavePeriod.setTitle(DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE);
    }
    checkNoLeavePeriodPresent() {
        //this.getTableLaborReportRowsWithProjects().children().contains('[role="gridcell"]', "Б").should('not.exist');
        cy.get(TABLE_LABOR_REPORTS_FIRST_ROW_CELLS).should('have.text', "");
        cy.get(TABLE_LABOR_REPORTS_TOTAL_ROW_CELLS).should('have.text', "");

        cy.get(TABLE_LEAVE_PERIODS_LAST_LEAVE_TYPE_CELL).should('not.exist');
    }
    checkLeavePeriodWasAdded() {
        //this.getTableLaborReportRowsWithProjects().children().contains('[role="gridcell"]', "Б").should('not.exist');
        cy.get(TABLE_LABOR_REPORTS_FIRST_ROW_CELLS).should('have.text', "БББББББББББББББББББ");
        cy.get(TABLE_LABOR_REPORTS_TOTAL_ROW_CELLS).should('have.text', "БББББББББББББББББББ");

        cy.get(TABLE_LEAVE_PERIODS_LAST_LEAVE_TYPE_CELL).should('have.text', "Больничный");
    }
}

