//import header from "./header";

//const  = require("../fixtures/.json");

class DroverAddSickPeriod {
    //элементы страницы
    getTitle() {
        return cy.xpath("//h4[.='Больничный']");
    }
    getIconCaledarStartDate() {
        return cy.get("svg[data-testid='CalendarIcon']").first();
    }
    
    //действия на странице

}

//module.exports = new DroverAddSickPeriod();
