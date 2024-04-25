import { HttpService } from "./httpService";

export class ApiController {
    constructor() {
        this.httpService = new HttpService();
    }

    read(url) {
        return this.httpService.request("GET", url);
    }

    create(url, body) {
        return this.httpService.request('POST', url, body);
    }

    options(url, body) {
        return this.httpService.request('OPTIONS', url, body);
    }

    checkStatusCode(response) {
        expect(response.status).to.eq(200);
    }

    allowMethods(currentMethod, expectedMethod){
        expect(currentMethod).to.equal(expectedMethod)
    }
}