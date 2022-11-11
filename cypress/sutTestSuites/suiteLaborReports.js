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
        this.checkLeavePeriodNotPresent();

        this.pageLaborReports.doOpenDroverAddLeavePeriod("SIC");
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();
        this.checkLeavePeriodWasAdded(helpers.sickPeriodCellsText(), "Больничный");
    }
    //добавить Ежегодный отпуск
    addPlannedLeavePeriod(startDate, endDate) {
        //проверяем, что отпуск не проставлен
        this.pageLaborReports.doNavigate().doWaitForApiResponse();
        this.checkLeavePeriodNotPresent();

        this.pageLaborReports.doOpenDroverAddLeavePeriod("VAC");
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        //проверяем, что отпуск появлися в таблице трудозатрат и таблице отсутствий
        this.checkLeavePeriodWasAdded(helpers.plannedLeavePeriodCellsText(), "Ежегодный отпуск");
    }
    //добавить Административный отпуск
    addAdministrativeLeavePeriod(startDate, endDate) {
        //проверяем, что отпуск не проставлен
        this.pageLaborReports.doNavigate().doWaitForApiResponse();
        this.checkLeavePeriodNotPresent();

        this.pageLaborReports.doOpenDroverAddLeavePeriod("ADM");
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        //проверяем, что отпуск появлися в таблице трудозатрат и таблице отсутствий
        this.checkLeavePeriodWasAdded(
            helpers.administrativePeriodCellsText(),
            "Административный отпуск"
        );
    }
    //добавить Декретный отпуск
    addMaternityPeriod(startDate, endDate) {
        //проверяем, что отпуск не проставлен
        this.pageLaborReports.doNavigate().doWaitForApiResponse();
        this.checkLeavePeriodNotPresent();

        this.pageLaborReports.doOpenDroverAddLeavePeriod("MAT");
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        //проверяем, что отпуск появлися в таблице трудозатрат и таблице отсутствий
        this.checkLeavePeriodWasAdded(helpers.maternityPeriodCellsText(), "Декретный отпуск");
    }
    //удалить последний отпуск
    addMostRecentLeavePeriod(startDate, endDate) {}

    //вспомогательные методы проверок
    checkLeavePeriodNotPresent() {
        this.pageLaborReports.getTableLaborReportFirstPrjRowCells().should("have.text", "");
        this.pageLaborReports.getTableLaborReportRowTotalCells().should("have.text", "");

        this.pageLaborReports.getTableLeavePeriodsFirstLeaveTypeCell().should("not.exist");
    }
    checkLeavePeriodWasAdded(cellsText, periodType) {
        //this.getTableLaborReportRowsWithProjects().children().contains('[role="gridcell"]', "Б").should('not.exist');
        this.pageLaborReports.getTableLaborReportFirstPrjRowCells().should("have.text", cellsText);
        this.pageLaborReports.getTableLaborReportRowTotalCells().should("have.text", cellsText);

        this.pageLaborReports
            .getTableLeavePeriodsFirstLeaveTypeCell()
            .should("have.text", periodType);
    }
}
