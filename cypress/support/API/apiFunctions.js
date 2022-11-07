//процедура логина через API
export function doLogin(userData) {
    cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
            "login": userData.username,
            "password": userData.password
        }
    }).then(function (response) {
        console.log(response.body);
        expect(response.status).to.eq(200);
        expect(response.body.token).to.not.be.null;
        cy.setCookie('auth_token', response.body.token);
        console.log("POST /api/login answer was received");
    }).then(function (response) {
        return response;
    });
        
}