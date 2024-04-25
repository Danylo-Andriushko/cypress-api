export class BasePage {
    constructor(page){
        this.page = page
    }

    open(){
        cy.visit(this.url)
    }

    checkPageUrl(){
        cy.url().should('eq', `${Cypress.config('baseUrl')}${this.url}`);
        return this;
    }
}