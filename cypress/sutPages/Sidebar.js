//локаторы Главная
const SIDEBAR = "ul[class*='MuiList-root css-1qp5pvt']",
    ITEM_WORKING_HOURS = 'Трудозатраты',
    ITEM_PROJECTS = "//p[.='Мои проекты']",
    ITEM_USERS = "//a[@href='/users']",
    ITEM_ANALYTYCS = "//li//p[contains(.,'Аналитика')]", //a[.='Аналитика']", //*[@id="__next"]/div/div/div[3]/ul/li[1]/ul/li[4]/a/p
    ITEM_SUMMARY_PLAN = "//a[.='Сводный ресурсный план']",
    ITEM_LEAVE_PLAN = "//a[.='График отпусков']",
    ITEM_CALENDAR = "//a[.='Производственный календарь']",
    //локаторы Администрирование
    LIST_ADM_FUNCTIONS  = 'li[class="MuiListItem-root MuiListItem-gutters css-l93goy"]',
    ITEM_ADM_PROJECT_ROLES = "//p[.='Проектные роли']",
    ITEM_ADM_SYS_ROLE_ASSIGN = "//p[.='Назначение системных ролей']",
    ITEM_ADM_USERS = "//a[@href='/admin/users']",
    ITEM_ADM_PROJECTS = "//p[.='Проекты']",
    ITEM_ADM_SETTINGS = "//a[.='Настройки']",
    ITEM_ADM_INTEGRATIONS = "//a[.='Интеграции']",
    ITEM_ADM_LOGGING = "//a[.='Логирование']";


export default class Sidebar {
    //элементы страницы
    getSidebar() {
        return cy.get(SIDEBAR);
    }
    getSidebarListItems() { //убрать Num
        return cy.get(SIDEBAR).find('li');
    }
    getBtnWorkingHours() {
        //return cy.xpath(ITEM_WORKING_HOURS);
        return cy.contains('li', ITEM_WORKING_HOURS);
    }
    getBtnProjects() {
        return cy.xpath(ITEM_PROJECTS);
    }
    getBtnUsers() {
        return cy.xpath(ITEM_USERS);
    }
    getBtnAnalytics() {
        return cy.xpath(ITEM_ANALYTYCS);
    }
    getBtnSummaryPlan() {
        return cy.xpath(ITEM_SUMMARY_PLAN);
    }
    getBtnLeavePlan() {
        return cy.xpath(ITEM_LEAVE_PLAN);
    }
    getBtnCalendar() {
        return cy.xpath(ITEM_CALENDAR);
    }


    getAdminBlock() {
        return cy.get(LIST_ADM_FUNCTIONS);
    }
    getBtnAPrjRoles() {
        return cy.xpath(ITEM_ADM_PROJECT_ROLES);
    }
    getBtnASetPrjRoles() {
        return cy.xpath(ITEM_ADM_SYS_ROLE_ASSIGN);
    }
    getBtnAUsers() {
        return cy.xpath(ITEM_ADM_USERS);
    }
    getBtnAProjects() {
        return cy.xpath(ITEM_ADM_PROJECTS);
    }
        getBtnASettings() {
        return cy.xpath(ITEM_ADM_SETTINGS);
    }
    //действия на странице
}

//module.exports = new Sidebar();