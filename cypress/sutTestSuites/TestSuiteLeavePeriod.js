//import PageLogin from "../sutPages/pageLogin";
import PageLaborReport from "../sutPages/PageLaborReport/PageLaborReport";
//import DroverAddLeavePeriod from "../sutPages/PageLaborReport/DroverAddLeavePeriod";

export default class TestSuiteLeavePeriod{
    constructor() {
        this.pageLaborReport = new PageLaborReport;
        //this.droverAddLeavePeriod = new DroverAddLeavePeriod;
        this.startLeaveDay = null;
        this.endLeaveDay = null;
        this.calculateLeavePeriodDatesForTest();
    }

    calculateLeavePeriodDatesForTest() {
        //число месяца для начала отсутствия
        this.startLeaveDay = 2;
        //число месяца для конца отсутствия = текущей дате
        let now = new Date();
        // console.log(now);
        // console.log(now.getMonth());
        let nowDay = now.getDate() >1 ? ("0" + (now.getDate())).slice(-2) : 2;
        let nowMonth = ("0" + (now.getMonth() + 1)).slice(-2);
        let nowYear = now.getFullYear()
        this.endLeaveDate = nowDay + "." + nowMonth + "." + nowYear;
        console.log(this.endLeaveDate);
    }
    clearAllLeavewPeriods() {
        
    }
    ensureOneLeavePeriod() {

    }
    ensureActiveProjectsPresent() {
        
    }

    //добавить Больничный отпуск
    addSickPeriod(startDate, endDate) {
        this.pageLaborReport.doOpenDroverAddSickPeriod();
        this.pageLaborReport.droverAddLeavePeriod
            .checkElems()
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        // this.droverAddLeavePeriod.getInputStartDate();
        // this.droverAddLeavePeriod.getDatapickerStartDate();
    }
    //добавить Ежегодный отпуск
    addPlanedLeavePeriod(startDate, endDate) {

    }
    //добавить Административный отпуск
    addAdministrativePeriod(startDate, endDate) {

    }
    //добавить Декретный отпуск
    addMaternityPeriod(startDate, endDate) {

    }
    //удалить последний отпуск
    addMostRecentLeavePeriod(startDate, endDate) {

    }

}