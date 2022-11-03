//локаторы раздела Главная
const SIDEBAR = "ul[class*='MuiList-root css-1qp5pvt']",
    LIST_GENERAL_FUNCTIONS = "//li[@class='MuiListItem-root MuiListItem-gutters css-hsebhl']",
    ITEM_TITLE_GENERAL_FUNCTIONS = "//li/p[.='Главная']",
    ITEM_WORKING_HOURS = "//li/a[.='Трудозатраты']",
    ITEM_PROJECTS = "[href='/projects']",
    ITEM_USERS = "//li//a[@href='/users']",
    ITEM_ANALYTYCS = "//li//a[.='Аналитика']",
    ITEM_SUMMARY_RES_PLAN = "//li//a[.='Сводный ресурсный план']",
    ITEM_LEAVE_PLAN = "//li//a[.='График отпусков']",
    ITEM_CALENDAR = "//li//a[.='Производственный календарь']",
    //локаторы раздела Администрирование
    LIST_ADM_FUNCTIONS = 'li[class="MuiListItem-root MuiListItem-gutters css-l93goy"]',
    ITEM_ADM_PROJECT_ROLES = "//li//p[.='Проектные роли']",
    ITEM_ADM_SYS_ROLE_ASSIGN = "//li//p[.='Назначение системных ролей']",
    ITEM_ADM_USERS = "//li//a[@href='/admin/users']",
    ITEM_ADM_PROJECTS = "//li//p[.='Проекты']",
    ITEM_ADM_SETTINGS = "//li//a[.='Настройки']",
    ITEM_ADM_INTEGRATIONS = "//li//a[.='Интеграции']",
    ITEM_ADM_LOGS = "//li//a[.='Логирование']",
    ITEM_ADM_AFFILIATES = "//li//a[.='Филиалы']",
    ITEM_ADM_PERSONAL_QUALITIES = "//li//a[.='Филиалы']";

export default class Sidebar {

//элементы страницы
    //элемент сайдбара
    getSidebar() {
        return cy.get(SIDEBAR);
    }
    //список элементов сайдбара
    getSidebarListItems() {
        return cy.get(SIDEBAR).find('li');
    }
    getGeneralBlock() {
        return cy.get(LIST_GENERAL_FUNCTIONS);
    }
    //элемент Трудозатраты
    getItemWorkingHours() {
        return cy.xpath(ITEM_WORKING_HOURS);
    }
    //элемент Проекты
    getItemProjects() {
        return cy.get(ITEM_PROJECTS);
    }
    //элемент Пользователи
    getItemUsers() {
        return cy.xpath(ITEM_USERS);
    }
    //элемент Аналитика
    getItemAnalytics() {
        return cy.xpath(ITEM_ANALYTYCS);
    }
    //элемент Сводный ресурсный план
    getItemSummaryResPlan() {
        return cy.xpath(ITEM_SUMMARY_RES_PLAN);
    }
    //элемент График отпусков
    getItemLeavePlan() {
        return cy.xpath(ITEM_LEAVE_PLAN);
    }
    //элемент Произовдственный календать
    getItemCalendar() {
        return cy.xpath(ITEM_CALENDAR);
    }

    //блок элементов администратора
    getAdminBlock() {
        return cy.get(LIST_ADM_FUNCTIONS);
    }
    //элемент Проектные роли
    getItemAdmPrjRoles() {
        return cy.xpath(ITEM_ADM_PROJECT_ROLES);
    }
    //элемент Назначение проектных ролей
    getItemAdmSetPrjRoles() {
        return cy.xpath(ITEM_ADM_SYS_ROLE_ASSIGN);
    }
    //элемент АПользователи
    getItemAdmUsers() {
        return cy.xpath(ITEM_ADM_USERS);
    }
    //элемент АПроекты
    getItemAdmProjects() {
        return cy.xpath(ITEM_ADM_PROJECTS);
    }
    //элемент Настройки
    getItemAdmSettings() {
        return cy.xpath(ITEM_ADM_SETTINGS);
    }
    //элемент Интеграции
    getItemAdmIntegrations() {
        return cy.xpath(ITEM_ADM_INTEGRATIONS);
    }
    //элемент Филиалы
    getItemAdmAffiliates() {
        return cy.xpath(ITEM_ADM_AFFILIATES);
    }
    //элемент КК Справочники
    getItemAdmKkPersonalQualities() {
        return cy.xpath(ITEM_ADM_PERSONAL_QUALITIES);
    }
    //элемент Логгирование
    getItemAdmLogs() {
        return cy.xpath(ITEM_ADM_LOGS);
    }
//действия на странице
}
