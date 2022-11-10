export function randomChar(num) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщэюя1234567890";
    for (let i = 0; i < num; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function calculateLeavePeriodStartDayForPicking() {
    return 2;
}
export function calculateLeavePeriodEndDateForTyping() {
    //число месяца для начала отсутствия
    //this.startLeaveDay = 2;
    //число месяца для конца отсутствия = текущей дате
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    let nowDay = 11;
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let endDate = nowDay + "." + nowMonth + "." + nowYear;
    return endDate;
}

export function sickPeriodCheckString() {
    return "ББББББББББ";
}
export function plannedLeavePeriodCheckString() {
    return "ОтОтОтОтОтОтОтОтОтОт";
}
export function administrativePeriodCheckString() {
    return "АААААААААА";
}
export function maternityPeriodCheckString() {
    return "ДДДДДДДДДД";
}
