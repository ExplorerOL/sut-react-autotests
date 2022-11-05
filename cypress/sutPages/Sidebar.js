//локаторы раздела Главная
const SIDEBAR = "ul[class*='MuiList-root']",
    LIST_GENERAL_FUNCTIONS = "//li[@class='MuiListItem-root MuiListItem-gutters css-hsebhl']",
    TITLE_MAIN_BLOCK = "Главная",
    TITLE_ADMIN_BLOCK = "Администрирование",

    //ссылки и иконки в элементах раздела сайдбара Главная
    ITEM_LABOR_REPORT_ICON = "[data-testid='CreateIcon']",
    ITEM_LABOR_REPORT_LINK = "a[href='/']",
    ITEM_PROJECTS_ICON = "[data-testid='ViewColumnIcon']",
    ITEM_PROJECTS_LINK = "a[href='/projects']",
    ITEM_USERS_ICON = "[data-testid='PeopleAltIcon']",
    ITEM_USERS_LINK = "a[href='/users']",
    ITEM_ANALYTICS_ICON = "[data-testid='AssessmentIcon']",
    ITEM_ANALYTICS_LINK = "a[href='/pivot-table']",
    ITEM_SUMMARY_RES_PLAN_ICON = "[data-testid='AssessmentIcon']",
    ITEM_SUMMARY_RES_PLAN_LINK = "a[href='/resource-plan-table']",
    ITEM_PLAN_LEAVE_PERIOD_ICON = "[data-testid='PhotoIcon']",
    ITEM_PLAN_LEAVE_PERIOD_LINK = "a[href='/vacation-schedule']",
    ITEM_PROD_CALENDAR_ICON = "[data-testid='EventIcon']",
    ITEM_PROD_CALENDAR_LINK = "a[href='/calendar']",

    //ссылки и иконки в элементах раздела сайдбара Администрирование
    LIST_ADM_FUNCTIONS = 'li[class="MuiListItem-root MuiListItem-gutters css-l93goy"]',
    ITEM_ADM_PRJ_ROLES_ICON = "[data-testid='FolderSharedIcon']",
    ITEM_ADM_PRJ_ROLES_LINK = "a[href='/admin/project-roles']",
    ITEM_ADM_ASSIGN_SYS_ROLES_ICON = "[data-testid='CreateNewFolderIcon']",
    ITEM_ADM_ASSIGN_SYS_ROLES_LINK = "a[href='/admin/user-roles']",
    ITEM_ADM_USERS_ICON = "[data-testid='PeopleAltIcon']",
    ITEM_ADM_USERS_LINK = "a[href='/admin/users']",
    ITEM_ADM_PROJECTS_ICON = "[data-testid='ViewColumnIcon']",
    ITEM_ADM_PROJECTS_LINK = "a[href='/admin/projects']",
    ITEM_ADM_SETTINGS_ICON = "[data-testid='SettingsIcon']",
    ITEM_ADM_SETTINGS_LINK = "a[href='/admin/settings']",
    ITEM_ADM_INTEGRATIONS_ICON = "[data-testid='WidgetsIcon']",
    ITEM_ADM_INTEGRATIONS_LINK = "a[href='/admin/integrations']",
    ITEM_ADM_LOGGING_ICON = "[data-testid='BuildIcon']",
    ITEM_ADM_LOGGING_LINK = "a[href='/admin/logging']";

    // ITEM_ADM_LOGS = "//li//a[.='Логирование']",
    // ITEM_ADM_AFFILIATES = "//li//a[.='Филиалы']",
    // ITEM_ADM_PERSONAL_QUALITIES = "//li//a[.='Филиалы']";

export default class Sidebar {

//элементы страницы
    //элемент сайдбара
    getSidebar() {
        return cy.get(SIDEBAR);
    }
    //список элементов сайдбара
    getSidebarItems() {
        return cy.get(SIDEBAR).find('li');
    }
    getMainBlockTitle() {
        return cy.get(SIDEBAR).contains(TITLE_MAIN_BLOCK);
    }
    //элемент Трудозатраты
    getItemLaborReport() {
        return cy.get(ITEM_LABOR_REPORT_LINK).find(ITEM_LABOR_REPORT_ICON);
    }
    //элемент Проекты
    getItemProjects() {
        return cy.get(ITEM_PROJECTS_LINK).find(ITEM_PROJECTS_ICON);
    }
    //элемент Пользователи
    getItemUsers() {
        return cy.get(ITEM_USERS_LINK).find(ITEM_USERS_ICON);
    }
    //элемент Аналитика
    getItemAnalytics() {
        return cy.get(ITEM_ANALYTICS_LINK).find(ITEM_ANALYTICS_ICON);
    }
    //элемент Сводный ресурсный план
    getItemSummaryResPlan() {
        return cy.get(ITEM_SUMMARY_RES_PLAN_LINK).find(ITEM_SUMMARY_RES_PLAN_ICON);
    }
    //элемент График отпусков
    getItemLeavePlan() {
        return cy.get(ITEM_PLAN_LEAVE_PERIOD_LINK).find(ITEM_PLAN_LEAVE_PERIOD_ICON);
    }
    //элемент Произовдственный календать
    getItemCalendar() {
        return cy.get(ITEM_PROD_CALENDAR_LINK).find(ITEM_PROD_CALENDAR_ICON);
    }

    
    //блок элементов администратора
    getAdminBlockTitle() {
         return cy.get(SIDEBAR).contains(TITLE_ADMIN_BLOCK);
    }
    //элемент Проектные роли
    getItemAdmPrjRoles() {
        return cy.get(ITEM_ADM_PRJ_ROLES_LINK).find(ITEM_ADM_PRJ_ROLES_ICON);
    }
    //элемент Назначение проектных ролей
    getItemAdmAssignSysRoles() {
        return cy.get(ITEM_ADM_ASSIGN_SYS_ROLES_LINK).find(ITEM_ADM_ASSIGN_SYS_ROLES_ICON);
    }
    //элемент АПользователи
    getItemAdmUsers() {
        return cy.get(ITEM_ADM_USERS_LINK).find(ITEM_ADM_USERS_ICON);
    }
    //элемент АПроекты
    getItemAdmProjects() {
        return cy.get(ITEM_ADM_PROJECTS_LINK).find(ITEM_ADM_PROJECTS_ICON);
    }
    //элемент Настройки
    getItemAdmSettings() {
        return cy.get(ITEM_ADM_SETTINGS_LINK).find(ITEM_ADM_SETTINGS_ICON);
    }
    //элемент Интеграции
    getItemAdmIntegrations() {
        return cy.get(ITEM_ADM_INTEGRATIONS_LINK).find(ITEM_ADM_INTEGRATIONS_ICON);
    }
    // //элемент Филиалы
    // getItemAdmAffiliates() {
    //     return cy.xpath(ITEM_ADM_AFFILIATES);
    // }
    // //элемент КК Справочники
    // getItemAdmKkPersonalQualities() {
    //     return cy.xpath(ITEM_ADM_PERSONAL_QUALITIES);
    // }
    //элемент Логгирование
    getItemAdmLogs() {
        return cy.get(ITEM_ADM_LOGGING_LINK).find(ITEM_ADM_LOGGING_ICON);
    }
//действия на странице
    //проверка отсутствия элементов адрминистратора в сайдбаре
    checkAdminElemsNotPresentLU() {
        this.getAdminBlockTitle().should('not.exist');
        cy.get(ITEM_ADM_PRJ_ROLES_LINK).should('not.exist');
        cy.get(ITEM_ADM_ASSIGN_SYS_ROLES_LINK).should('not.exist');
        cy.get(ITEM_ADM_USERS_LINK).should('not.exist');
        cy.get(ITEM_ADM_PROJECTS_LINK).should('not.exist');
        cy.get(ITEM_ADM_SETTINGS_LINK).should('not.exist');
        cy.get(ITEM_ADM_INTEGRATIONS_LINK).should('not.exist');
    }
    //проверка отсутствия элементов адрминистратора у тех. ассиста
    checkAdminElemsNotPresentT() {
        cy.get(ITEM_ADM_PRJ_ROLES_LINK).should('not.exist');
        cy.get(ITEM_ADM_ASSIGN_SYS_ROLES_LINK).should('not.exist');
        cy.get(ITEM_ADM_USERS_LINK).should('not.exist');
        cy.get(ITEM_ADM_PROJECTS_LINK).should('not.exist');
        cy.get(ITEM_ADM_SETTINGS_LINK).should('not.exist');
        cy.get(ITEM_ADM_INTEGRATIONS_LINK).should('not.exist');
    }
}
