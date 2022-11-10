//логина через API
export function doLogin(userData) {
    let userInfo;

    return cy.request({
        method: "POST",
        url: "/api/login",
        body: {
            login: userData.username,
            password: userData.password,
        },
    });
    //.as("APILogin")
    //cy.wait("@APILogin").then((response) => {});

    // .then(function (response) {
    //     console.log("1 then");
    //     console.log(response.body);

    //     expect(response.status).to.eq(200);
    //     expect(response.body.token).to.not.be.null;
    //     cy.setCookie("auth_token", response.body.token);
    //     console.log("POST /api/login answer was received");
    //     Cypress.env("login_resp", response.body);

    //     console.log("from env");
    //     console.log(Cypress.env("login_resp"));
    //     //this.userInfo = response.body;
    //     //return this.userInfo;
    //     //console.log("1 " + response.body);
    // });
    // console.log("before return 2");
    // console.log(userInfo);
    // return userInfo;
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
export function getAllLeavePeriods(userInfo) {
    console.log("userInfo");
    console.log(userInfo);
    // cy.request({
    //     method: "GET",
    //     url: "/api/leave-periods/?userId=" + userInfo.user.id + cy.getCookie("auth_token"),
    // })
    //     .as("@getLP")
    //     .then(function (response) {
    //         //expect(response.status).to.eq(204);
    //         console.log(response);
    //     })
    //     .then(function (resp) {
    //         return resp.body;
    //     });
}
