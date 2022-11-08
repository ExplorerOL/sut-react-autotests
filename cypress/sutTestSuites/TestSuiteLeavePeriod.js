//import PageLogin from "../sutPages/pageLogin";
import PageLaborReport from "../sutPages/PageLaborReports/PageLaborReports";
import * as auxFunctions from "../support/auxilary/auxilaryFunctions";
//import DroverAddLeavePeriod from "../sutPages/PageLaborReport/DroverAddLeavePeriod";

export default class TestSuiteLeavePeriod{
    constructor() {
        this.pageLaborReport = new PageLaborReport;
        //this.droverAddLeavePeriod = new DroverAddLeavePeriod;
        this.startLeaveDay = auxFunctions.calculateLeavePeriodStartDayForPicking();
        this.endLeaveDate = auxFunctions.calculateLeavePeriodEndDateForTyping();
        
    }

    clearAllLeavewPeriods() {
        
    }
    ensureOneLeavePeriod() {

    }
    ensureActiveProjectsPresent() {
        
    }

    //добавить Больничный отпуск
    addSickPeriod(startDate, endDate) {
        //проверяем, что больничные не проставлены
        this.pageLaborReport.checkNoLeavePeriodPresent();
        this.pageLaborReport.doOpenDroverAddSickPeriod();
        this.pageLaborReport.droverAddLeavePeriod
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