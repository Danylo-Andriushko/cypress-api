export class HttpService {
    request(method, url, body) {
        return cy.request(method, url, body);
    }
}