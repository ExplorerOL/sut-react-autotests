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

export function calculateLeavePeriodStartDateYYYYMMDD() {
    //число месяца для начала отсутствия
    //this.startLeaveDay = 2;
    //число месяца для конца отсутствия = текущей дате
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    let nowDay = "02";
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let endDate = nowYear + "-" + nowMonth + "-" + nowDay;
    return endDate;
}

export function calculateLeavePeriodEndDateYYYYMMDD() {
    //число месяца для начала отсутствия
    //this.startLeaveDay = 2;
    //число месяца для конца отсутствия = текущей дате
    let now = new Date();
    //let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
    let nowDay = "11";
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
    let nowDay = "11";
    let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
    let nowYear = now.getFullYear();
    let endDate = nowDay + "." + nowMonth + "." + nowYear;
    return endDate;
}

export function leavePeriodTextToCheck(leavePeriodType) {
    switch (leavePeriodType) {
        case "SIC": {
            return {
                cellsText: "ББББББББББ",
                periodName: "Больничный",
            };
        }
        case "VAC": {
            return {
                cellsText: "ОтОтОтОтОтОтОтОтОтОт",
                periodName: "Ежегодный отпуск",
            };
        }
        case "ADM": {
            return {
                cellsText: "АААААААААА",
                periodName: "Административный отпуск",
            };
        }
        case "MAT": {
            return {
                cellsText: "ДДДДДДДДДД",
                periodName: "Декретный отпуск",
            };
        }
    }
}
export function plannedLeavePeriodCellsText() {
    return "ОтОтОтОтОтОтОтОтОтОт";
}
export function administrativePeriodCellsText() {
    return "АААААААААА";
}
export function maternityPeriodCellsText() {
    return "ДДДДДДДДДД";
}
