class LogIn {

    googleButton = '.column > .button';
    emailInput = '[data-cy="password-input"]';
    passwordinput = '[data-cy="password-input"]';
    forgotPassword = '[data-cy="password-input"]';
    confirmButton = '[data-cy="login-form"] > .button-wrap';
    createAccount = 'span[data-v-a795b111=""] > a';


    
    onboardingStart() {
        cy.visit('https://letz-dev-frontend.vercel.app/');
    }

    cacheSessionAndLocalStorageDelete() {
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });

        cy.clearLocalStorage();

        cy.reload(true);
    }

    validateSignInObjects() {
        cy.get(this.googleButton).should('be.visible');
        cy.get(this.emailInput).should('be.visible');
        cy.get(this.passwordinput).should('be.visible');
        cy.get(this.forgotPassword).should('be.visible');
        cy.get(this.confirmButton).should('be.visible');

    }

    googleLogIn() {
        cy.get(this.googleButton).click()
    }

    createNewAccount() {
        cy.get(this.createAccount).click();
    }

}

export const logInPage = new LogIn();