import { logInPage } from '../support/page_objects/logInPage';
import { signUpPage } from '../support/page_objects/signUpPage';
import { onboardingPage } from '../support/page_objects/onboardingPage';


describe('Sign up and Onboarding Flow ', () => { 
    
    before('Page should load properly', () => {
        logInPage.onboardingStart();
        logInPage.cacheSessionAndLocalStorageDelete();
    }); 

    describe('Sign Up Process from Log In Page', () => { 
        it('Validates Sing In Objects', () => {
            cy.url().should('include', 'letz')
            logInPage.validateSignInObjects();
        });
    
        it('User is able to fill out the Sign Up Form', () => {
            logInPage.createNewAccount();
            cy.url().should('include', 'auth/signup')
            signUpPage.validateSignUpObjects();
            signUpPage.fillTestUserFields();
            
        });
    
        it('User is able to upload an Image', () => {
            signUpPage.uploadProfileImage();
        });
    
        it('User creates a valid password', () => {
            signUpPage.createsValidPassword();
        });
    
        it('User completes the signUp process', () => {
            signUpPage.completeAndValidatesSignUp();
        });
    })

    describe('OnBoarding Flow for new User', () => { 
        it('User is redirected to the Onboarding flow', () => {
            onboardingPage.validatesFirstLandingObjects();
        });

        it('User is able to select a Nickname', () => {
            onboardingPage.nicknameStep();
        });

        it('User is able to select an Avatar', () => {
            onboardingPage.avatarStep();
        });
    })
    


    

})