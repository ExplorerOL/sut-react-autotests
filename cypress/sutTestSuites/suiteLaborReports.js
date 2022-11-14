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

    //добавить Больничный отпуск
    addLeavePeriod(leavePeriodType) {
        //проверяем, что больничные не проставлены
        this.pageLaborReports.doNavigate().doWaitForAPILeavePeriodsANDLaborReportsResponse();
        this.checkLeavePeriodNotPresent();

        this.pageLaborReports.doOpenDroverAddLeavePeriod(leavePeriodType);
        this.pageLaborReports.droverAddLeavePeriod
            .doSelectDayOfCurrentMonthFromDatapicker(this.startLeaveDay)
            .doTypeEndDate(this.endLeaveDate)
            .doClickBtnSave();
        this.pageLaborReports.doWaitForAPILeavePeriodsResponse();
        this.checkLeavePeriodExists(helpers.leavePeriodTextToCheck(leavePeriodType));
    }
    //удалить последний отпуск
    deleteMostRecentLeavePeriod(leavePeriodType) {
        this.pageLaborReports.doNavigate().doWaitForAPILeavePeriodsANDLaborReportsResponse();
        this.checkLeavePeriodExists(helpers.leavePeriodTextToCheck(leavePeriodType));
        this.pageLaborReports.doDeleteLastLeavePeriod().doWaitForAPILeavePeriodsResponse();
        this.checkLeavePeriodNotPresent();
    }

    //вспомогательные методы проверок
    checkLeavePeriodNotPresent() {
        this.pageLaborReports.getTableLaborReportFirstPrjRowCells().should("have.text", "");
        this.pageLaborReports.getTableLaborReportRowTotalCells().should("have.text", "");

        this.pageLaborReports.getTableLeavePeriodsCellFirstLeavePeriodType().should("not.exist");
    }
    checkLeavePeriodExists(referenceTextsObj) {
        //this.getTableLaborReportRowsWithProjects().children().contains('[role="gridcell"]', "Б").should('not.exist');
        this.pageLaborReports.getTableLaborReportFirstPrjRowCells().should("have.text", referenceTextsObj.cellsText);
        this.pageLaborReports.getTableLaborReportRowTotalCells().should("have.text", referenceTextsObj.cellsText);

        this.pageLaborReports
            .getTableLeavePeriodsCellFirstLeavePeriodType()
            .should("have.text", referenceTextsObj.periodName);
    }
    //проверка элементов дровера добавления отутствий
    checkDroverAddLeavePeriodElemsPresence() {
        this.getTitle().should('exist');
        this.getDroverText().should('exist');
        this.getLblInputStartData().should('exist');
        this.getLblInputEndData().should('exist');
        this.getInputStartDate().should('exist');
        this.getInputEndDate().should('exist');
        this.getDatapickerStartDate().should('exist');
        this.getDatapickerEndDate().should('exist');
        return this;
    }
}
