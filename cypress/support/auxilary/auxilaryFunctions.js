export function calculateLeavePeriodStartDayForPicking() {
    return 10;
    }
export function calculateLeavePeriodEndDateForTyping() {
    //число месяца для начала отсутствия
    //this.startLeaveDay = 2;
    //число месяца для конца отсутствия = текущей дате
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    let nowDay = 20;
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear()
    let endDate = nowDay + "." + nowMonth + "." + nowYear;
    return endDate;
    }