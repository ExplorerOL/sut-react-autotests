//import PageLogin from "../sutPages/pageLogin";
import PageLaborReport from "../sutPages/PageLaborReports/PageLaborReports";
import * as helpers from "../support/helpers.js";
//import DroverAddLeavePeriod from "../sutPages/PageLaborReport/DroverAddLeavePeriod";

export default class SuiteLaborReports {
    constructor() {
        this.pageLaborReports = new PageLaborReport();
        //this.droverAddLeavePeriod = new DroverAddLeavePeriod;
        this.startLeaveDay = helpers.calculateLeavePeriodStartDayForPicking();
        this.endLeaveDate = helpers.calculateLeavePeriodEndDateForTyping();
    }

    clearAllLeavewPeriods() {}
    ensureOneLeavePeriod() {}
    ensureActiveProjectsPresent() {}

    //добавить Больничный отпуск
    addSickPeriod(startDate, endDate) {
        //проверяем, что больничные не проставлены
        this.pageLaborReports.doNavigate().doWaitForApiResponse();
        this.checkNoLeavePeriodPresent();

        this.pageLaborReports.doOpenDroverAddSickPeriod();
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        this.checkLeavePeriodWasAdded();

        // this.droverAddLeavePeriod.getInputStartDate();
        // this.droverAddLeavePeriod.getDatapickerStartDate();
    }
    //добавить Ежегодный отпуск
    addPlanedLeavePeriod(startDate, endDate) {}
    //добавить Административный отпуск
    addAdministrativePeriod(startDate, endDate) {}
    //добавить Декретный отпуск
    addMaternityPeriod(startDate, endDate) {}
    //удалить последний отпуск
    addMostRecentLeavePeriod(startDate, endDate) {}

    //вспомогательные методы проверок
    checkNoLeavePeriodPresent() {
        //this.getTableLaborReportRowsWithProjects().children().contains('[role="gridcell"]', "Б").should('not.exist');
        this.pageLaborReports.getTableLaborReportFirstPrjRowCells().should("have.text", "");
        this.pageLaborReports.getTableLaborReportRowTotalCells().should("have.text", "");

        this.pageLaborReports.getTableLeavePeriodsFirstLeaveTypeCell().should("not.exist");
    }
    checkLeavePeriodWasAdded() {
        //this.getTableLaborReportRowsWithProjects().children().contains('[role="gridcell"]', "Б").should('not.exist');
        this.pageLaborReports
            .getTableLaborReportFirstPrjRowCells()
            .should("have.text", "БББББББББББББББББББ");
        this.pageLaborReports
            .getTableLaborReportRowTotalCells()
            .should("have.text", "БББББББББББББББББББ");

        this.pageLaborReports
            .getTableLeavePeriodsFirstLeaveTypeCell()
            .should("have.text", "Больничный");
    }
}
