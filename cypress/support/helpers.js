export function randomChar(num) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщэюя1234567890";
    for (let i = 0; i < num; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function saveUserInfoAndSetCookies(POSTResponseBody) {
    cy.setCookie("auth_token", POSTResponseBody.body.token);
    Cypress.env("userAuthInfoByAPI", POSTResponseBody.body);
}

export function calculateLeavePeriodStartDayForPicking() {
    return 2;
}

export function calculateLeavePeriodStartDateYYYYMMDD() {
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    //число месяца для начала отсутствия пока фиксированное
    let nowDay = "02";
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let endDate = nowYear + "-" + nowMonth + "-" + nowDay;
    return endDate;
}

export function calculateLeavePeriodEndDateYYYYMMDD() {
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    //число месяца для начала отсутствия пока фиксированное
    let nowDay = "21";
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let endDate = nowYear + "-" + nowMonth + "-" + nowDay;
    return endDate;
}

export function calculateLeavePeriodStartDateForTyping() {
    //число месяца для начала отсутствия
    //this.startLeaveDay = 2;
    //число месяца для конца отсутствия = текущей дате
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    let nowDay = "02";
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let startDate = nowDay + "." + nowMonth + "." + nowYear;
    return startDate;
}
export function calculateLeavePeriodEndDateForTyping() {
    //число месяца для начала отсутствия
    //this.startLeaveDay = 2;
    //число месяца для конца отсутствия = текущей дате
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    let nowDay = "21";
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let endDate = nowDay + "." + nowMonth + "." + nowYear;
    return endDate;
}

export function leavePeriodTextToCheck(leavePeriodType) {
    switch (leavePeriodType) {
        case "SIC": {
            return {
                cellsText: "ББББББББББББББББББББ",
                periodName: "Больничный",
            };
        }
        case "VAC": {
            return {
                cellsText: "ОтОтОтОтОтОтОтОтОтОтОтОтОтОтОтОтОтОтОтОт",
                periodName: "Ежегодный отпуск",
            };
        }
        case "ADM": {
            return {
                cellsText: "АААААААААААААААААААА",
                periodName: "Административный отпуск",
            };
        }
        case "MAT": {
            return {
                cellsText: "ДДДДДДДДДДДДДДДДДДДД",
                periodName: "Декретный отпуск",
            };
        }
    }
}
