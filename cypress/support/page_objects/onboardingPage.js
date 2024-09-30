class OnboardingPage {

    onBoardingTitle = '.neon-text'; 
    onBoardingSubtitles = 'h3'; 
    startButton = '.start-button'; 
    larryImage = 'img[src="/images/pets/larry/larry-jumping.png"]'; 
    greetingSpan = 'span:contains("Hola")'; 
    nicknameField = 'input[placeholder="Tu nickname"]'; 
    nickNameConfirmation = 'h4';
    avatarsContainer = '.avatars img'


    validatesFirstLandingObjects() {
         // Validate the image is displayed
        cy.get(this.larryImage)
            .should('be.visible')
            .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0); // Ensures the image is loaded
    });

        // Validate the title contains the expected text
        cy.get(this.onBoardingTitle)
            .should('be.visible')
            .and('contain.text', 'Hello, soy Larry');

        // Validate the subtitle is displayed
        cy.get(this.onBoardingSubtitles)
            .should('be.visible')
            .and('contain.text', 'Te mostraré la forma más pro de aprender inglés');

        // Validate the "Empecemos" button is displayed and clickable
        cy.get(this.startButton)
            .should('be.visible')
            .and('be.enabled')
            .click(); 
    }

    nicknameStep () {
        // Validate the span with "Hola" is visible
        cy.get(this.greetingSpan)
            .should('be.visible')
            .and('contain.text', 'Hola');

        cy.get(this.onBoardingSubtitles)
            .should('be.visible')
            .and('contain.text', ' Primero, me encantaría saber tu nombre para poder llamarte así mientras te acompaño en esta aventura.');

        cy.get(this.nicknameField)
            .should('be.visible')
            .clear() // Ensure it's empty first
            .type('TestUser')
            .should('have.value', 'TestUser');

        cy.contains('button', 'Continuar')
            .should('be.visible')
            .click();

        cy.get(this.nickNameConfirmation)
            .should('be.visible')
            .and('contain.text', ' ¡Genial, TestUser! ¡Encantado de conocerte! 😊 ')

        cy.contains('button', 'Continuar')
            .should('be.visible')
            .click();
    }

    avatarStep () {
        cy.get(this.onBoardingSubtitles)
            .should('be.visible')
            .and('contain.text', '  Escojamos un avatar para ti.');
        
            this.validateAndSelectRandomAvatar();

        
    }

    validateAndSelectRandomAvatar() {
        // Get all avatars inside the avatars container
        cy.get(this.avatarsContainer)
            .should('be.visible') // Ensure the avatars are visible
            .each(($avatar) => {
                // Check if each avatar is displayed
                cy.wrap($avatar)
                    .should('be.visible')
                    .and(($img) => {
                        // Ensure the image is loaded by checking its natural width
                        expect($img[0].naturalWidth).to.be.greaterThan(0);
                    });
            })
            .then(($avatars) => {
                // Select a random avatar from the list
                const randomIndex = Math.floor(Math.random() * $avatars.length);
                cy.wrap($avatars[randomIndex]).click(); // Click the random avatar
            });
    }

}

export const onboardingPage = new OnboardingPage();