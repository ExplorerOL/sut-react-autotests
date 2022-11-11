//логина через API
export function doLogin(userData) {
    return cy.request({
        method: "POST",
        url: "/api/login",
        body: {
            login: userData.username,
            password: userData.password,
        },
    });
}

export async function doLoginAndSaveUserInfoAndToken(userCreds) {
    return doLogin(userCreds).then(
        await function (response) {
            expect(response.status).to.eq(200);
            expect(response.body.token).to.not.be.null;
            cy.setCookie("auth_token", response.body.token);
            Cypress.env("userInfoFromPOST", response.body);
        }
    );
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

export function addLeavePeriod(userInfo, leavePeriodType) {
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
