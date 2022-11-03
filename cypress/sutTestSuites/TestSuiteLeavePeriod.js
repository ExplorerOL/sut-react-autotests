import PageLogin from "../sutPages/pageLogin";
import PageWorkHours from "../sutPages/PageLaborReport/PageLaborReport";

export default class TestSuiteLeavePeriod{
    constructor() {
        this.pageWorkHours = new PageWorkHours;
    }
    //добавить Больничный отпуск
    addSickPeriod(startDate, endDate) {

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