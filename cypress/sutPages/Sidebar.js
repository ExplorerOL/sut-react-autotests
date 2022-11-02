//локаторы раздела Главная
const SIDEBAR = "ul[class*='MuiList-root css-1qp5pvt']",
    ITEM_WORKING_HOURS = 'Трудозатраты',
    ITEM_PROJECTS = "//p[.='Мои проекты']",
    ITEM_USERS = "//a[@href='/users']",
    ITEM_ANALYTYCS = "//li//p[contains(.,'Аналитика')]", //a[.='Аналитика']", //*[@id="__next"]/div/div/div[3]/ul/li[1]/ul/li[4]/a/p
    ITEM_SUMMARY_RES_PLAN = "//a[.='Сводный ресурсный план']",
    ITEM_LEAVE_PLAN = "//a[.='График отпусков']",
    ITEM_CALENDAR = "//a[.='Производственный календарь']",
//локаторы раздела Администрирование
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
    //элемент сайдбара
    getSidebar() {
        return cy.get(SIDEBAR);
    }
    //список элементов сайдбара
    getSidebarListItems() {
        return cy.get(SIDEBAR).find('li');
    }
    //элемент Трудозатраты
    getItemWorkingHours() {
        return cy.contains('li', ITEM_WORKING_HOURS);
    }
    //элемент Проекты
    getItemProjects() {
        return cy.xpath(ITEM_PROJECTS);
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
    getItemAPrjRoles() {
        return cy.xpath(ITEM_ADM_PROJECT_ROLES);
    }
    //элемент Назначение проектных ролей
    getItemASetPrjRoles() {
        return cy.xpath(ITEM_ADM_SYS_ROLE_ASSIGN);
    }
    //элемент АПользователи
    getItemAUsers() {
        return cy.xpath(ITEM_ADM_USERS);
    }
    //элемент АПроекты
    getItemAProjects() {
        return cy.xpath(ITEM_ADM_PROJECTS);
    }
    //элемент Настройки
    getItemASettings() {
        return cy.xpath(ITEM_ADM_SETTINGS);
    }
//действия на странице
}
