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

        //проверяем, что больничный появлися в таблице трудозатрат и таблице отсутствий
        this.pageLaborReports
            .getTableLaborReportFirstPrjRowCells()
            .should("have.text", helpers.sickPeriodCheckString());
        this.pageLaborReports
            .getTableLaborReportRowTotalCells()
            .should("have.text", helpers.sickPeriodCheckString());

        this.pageLaborReports
            .getTableLeavePeriodsFirstLeaveTypeCell()
            .should("have.text", "Больничный");
    }
    //добавить Ежегодный отпуск
    addPlannedLeavePeriod(startDate, endDate) {
        //проверяем, что отпуск не проставлен
        this.pageLaborReports.doNavigate().doWaitForApiResponse();
        this.checkNoLeavePeriodPresent();

        this.pageLaborReports.doOpenDroverAddPlannedLeavePeriod();
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        //проверяем, что отпуск появлися в таблице трудозатрат и таблице отсутствий
        this.pageLaborReports
            .getTableLaborReportFirstPrjRowCells()
            .should("have.text", helpers.plannedLeavePeriodCheckString());
        this.pageLaborReports
            .getTableLaborReportRowTotalCells()
            .should("have.text", helpers.plannedLeavePeriodCheckString());

        this.pageLaborReports
            .getTableLeavePeriodsFirstLeaveTypeCell()
            .should("have.text", "Ежегодный отпуск");
    }
    //добавить Административный отпуск
    addAdministrativeLeavePeriod(startDate, endDate) {
        //проверяем, что отпуск не проставлен
        this.pageLaborReports.doNavigate().doWaitForApiResponse();
        this.checkNoLeavePeriodPresent();

        this.pageLaborReports.doOpenDroverAddAdministrativeLeavePeriod();
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();

        //проверяем, что отпуск появлися в таблице трудозатрат и таблице отсутствий
        this.pageLaborReports
            .getTableLaborReportFirstPrjRowCells()
            .should("have.text", helpers.administrativePeriodCheckString());
        this.pageLaborReports
            .getTableLaborReportRowTotalCells()
            .should("have.text", helpers.administrativePeriodCheckString());

        this.pageLaborReports
            .getTableLeavePeriodsFirstLeaveTypeCell()
            .should("have.text", "Административный отпуск");
    }
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
            .should("have.text", "ОтОтОтОтОтОтОтОтОтОт");
        this.pageLaborReports
            .getTableLaborReportRowTotalCells()
            .should("have.text", "ОтОтОтОтОтОтОтОтОтОт");

        this.pageLaborReports
            .getTableLeavePeriodsFirstLeaveTypeCell()
            .should("have.text", "Ежегодный отпуск");
    }
}
