class OnboardingPage {

    onBoardingTitle = '.neon-text'; 
    onBoardingSubtitles = 'h3'; 
    startButton = '.start-button'; 
    larryImage = 'img'; 
    greetingSpan = 'span:contains("Hola")'; 
    nicknameField = 'input[placeholder="Tu nickname"]'; 
    confirmationMessage = 'h4';
    avatarsContainer = '.avatars img'


    validatesFirstLandingObjects() {
         // Validate the image is displayed
        cy.get(this.larryImage)
            .should('exist')
            .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0); // Ensures the image is loaded
    });

        // Validate the title contains the expected text
        cy.get(this.onBoardingTitle)
            .should('exist')
            .and('contain.text', 'Hello, soy Larry');

        // Validate the subtitle is displayed
        cy.get(this.onBoardingSubtitles)
            .should('exist')
            .and('contain.text', 'Te mostraré la forma más pro de aprender inglés');

        // Validate the "Empecemos" button is displayed and clickable
        cy.get(this.startButton)
            .should('exist')
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

        cy.get(this.confirmationMessage)
            .should('be.visible')
            .and('contain.text', ' ¡Genial, TestUser! ¡Encantado de conocerte! 😊 ')

        cy.contains('button', 'Continuar')
            .should('be.visible')
            .click();
    }

    avatarStep () {
        cy.get(this.onBoardingSubtitles)
            .should('be.visible')
            .and('contain.text', ' Escojamos un avatar para ti.  Elige el que más te guste ');
        
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

            cy.get('#nextStepContainer > .button').click();
    }

    selectRandomPurpose() {
        // Get all options
        cy.get('.overlay-layer .overlay-content')
            .should('be.visible') // Ensure options are visible
            .then(($options) => {
                const randomIndex = Math.floor(Math.random() * $options.length);
                const randomOption = $options[randomIndex];
    
                // Check if the random option contains the text "Other"
                cy.wrap(randomOption)
                    .invoke('text')
                    .then((text) => {
                        if (text.trim().toLowerCase() === 'other') {
                            // Click the "Other" option
                            cy.wrap(randomOption).click();
    
                            // Fill the input field for "Other"
                            cy.get('#other')
                                .should('be.visible') // Ensure the input is visible
                                .type('other test option'); // Enter the text
                        } else {
                            // Click any other option
                            cy.wrap(randomOption).click();
                        }
                    });
                    cy.get('.button').click();    
            });
    }

    validateProfileCreation(){
        cy.get('.container > :nth-child(1)').should('contain.text', 'Hemos creado tu perfil');
        cy.get('.button').first().click();
    }

    englishLevelSelection() {
        // Create an array of the selectors
        const elements = ['[alt="0"]', '[alt="1"]', '[alt="2"]'];

        // Generate a random index
        const randomIndex = Math.floor(Math.random() * elements.length);

        // Use the random index to select a random element and click it
        cy.get(elements[randomIndex]).click();
        cy.get('.button').click();
    }

    selectRandomIndustry() {
        // Get all options
        cy.get('.overlay-layer .overlay-content')
            .should('be.visible') // Ensure options are visible
            .then(($options) => {
                const randomIndex = Math.floor(Math.random() * $options.length);
                const randomOption = $options[randomIndex];
    
                // Check if the random option contains the text "Other"
                cy.wrap(randomOption)
                    .invoke('text')
                    .then((text) => {
                        if (text.trim().toLowerCase() === 'other') {
                            // Click the "Other" option
                            cy.wrap(randomOption).click();
    
                            // Fill the input field for "Other"
                            cy.get('#other')
                                .should('be.visible') // Ensure the input is visible
                                .type('other test option'); // Enter the text
                        } else {
                            // Click any other option
                            cy.wrap(randomOption).click();
                        }
                    });
                    cy.get('.button').click();    
            });
    }

    lastStepValidation() {
        cy.get(this.confirmationMessage).should('contain.text', ' Gracias por compartir esta información con nosotros. Emprende rumbo a esta gran experiencia que tenemos para ti');
        cy.get('.button').first().click();
    }

}

export const onboardingPage = new OnboardingPage();