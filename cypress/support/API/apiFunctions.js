import * as helpers from "../../support/helpers.js";

//логина через API
export function doLogin(userCreds) {
    return cy.request({
        method: "POST",
        url: "/api/login",
        body: {
            login: userCreds.username,
            password: userCreds.password,
        },
    });
}

export function saveUserInfoAndSetCookies(POSTResponseBody) {
    expect(POSTResponseBody.status).to.eq(200);
    expect(POSTResponseBody.body.token).to.not.be.null;
    cy.setCookie("auth_token", POSTResponseBody.body.token);
    Cypress.env("userAuthInfoByAP", POSTResponseBody.body);
}

//выход из системы API
export function doLogout(userData) {
    cy.request({
        method: "DELETE",
        url: "/api/login/" + cy.getCookie("auth_token"),
    })
        .then(function (response) {
            expect(response.status).to.eq(204);
        })
        .then(function (response) {
            return response;
        });
}

export function getUserInfoByToken(userToken) {
    console.log("---" + toString(userToken));
    // cy.request({
    //     method: "GET",
    //     url: "/api/login/remember-me",
    //     body: { token: toString(userToken) },
    // }).then(function (response) {
    //     //expect(response.status).to.eq(204);
    //     console.log(response);
    // });
}

//выход из системы API
function getAllLeavePeriods(userInfo) {
    return cy.request({
        method: "GET",
        url: "/api/leave-periods/?userId=" + userInfo.user.id,
        body: { token: toString(cy.getCookie("auth_token")) },
    });
}

export function deleteAllLeavePeriods(userInfo) {
    return getAllLeavePeriods(userInfo).then(function (response) {
        expect(response.status).to.eq(200);
        console.log(response.body);
        response.body.forEach((element) => {
            cy.request({
                method: "DELETE",
                url: "/api/leave-periods/" + element.id,
                body: { token: toString(cy.getCookie("auth_token")) },
            });
        });
    });
}

export function addLeavePeriod(userInfo, leavePeriodType, startDate, endDate) {
    return cy.request({
        method: "POST",
        url: "/api/leave-periods/",
        body: {
            reason: leavePeriodType,
            startDate: startDate,
            endDate: endDate,
            userId: userInfo.user.id,
        },
    });
}
