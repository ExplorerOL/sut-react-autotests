//локаторы страницы
const DROVER_ADD_LEAVE_PERIOD = '.MuiDrawer-paper',
    LBL_CHOOSE_DATES = "Выберите даты",
    LBL_START_DATE = "#mui-1-label",
    LBL_END_DATE = "#mui-2-label",
    DATAPICKER = "svg[data-test-id='CalendarIcon']",
    INPUT_START_DATE = "input[id='mui-1']",
    INPUT_END_DATE = "input[id='mui-1']",
    BTN_CANCEL = "button[class='button'][type='button']",
    BTN_SAVE = "button[class='onboarding__save-button'][type='submit']",
    BTN_CLOSE = "[data-testid='ClearIcon']";

export default class DroverAddSickPeriod {
    constructor(droverTitle) {
        this.title = droverTitle;
    }
//элементы страницы
    //окно дровера
    getDrowerWindow() {
        return cy.get(DROVER_ADD_LEAVE_PERIOD);
    }
    //название дровера
    getTitle() {
        return cy.contains('h4', this.title);
    }
    //текст выберите даты отпуска
    getDroverText() {
        return this.getDrowerWindow().contains('p', LBL_CHOOSE_DATES);
    }
    //получить название поля ввода даты начала
    getLblInputStartData() {
        return cy.get(LBL_START_DATE);
    }
    //получить название поля ввода даты конца
    getLblInputEndData() {
        return cy.get(LBL_END_DATE);
    }
    //датапикер начала периода
    getIconCaledarStartDate() {
        return cy.get("svg[data-testid='CalendarIcon']").first();
    }
    //датапикер конца периода
    getIconCaledarEndDate() {
        return cy.get("svg[data-testid='CalendarIcon']").last();
    }
    //кнопка Отмена
    getBtnCancel() {
        cy.get(BTN_CANCEL);
    }
    //кнопка Сохранить
    getBtnCancel() {
        cy.get(BTN_CANCEL);
    }
    //кнопка крестик Закрыть
    getBtnCancel() {
        cy.get(BTN_CLOSE);
    }
    
    
    //действия на странице
    checkDroveElems() {
        this.getTitle().should('exist');
        this.getDroverText().should('exist');
        this.getLblInputEndData().should('exist');
    }
}

