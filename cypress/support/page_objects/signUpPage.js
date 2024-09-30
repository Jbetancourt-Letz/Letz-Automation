class SignUpPage {
    
    title = '#main-signup-title';
    subTitle= '#main-signup-subtitle';
    googleButton = '.is-flex > .button';
    firstNameField = 'div:has(> label:contains("First Name")) input';
    lastNameField = 'div:has(> label:contains("Last Name")) input';
    emailField = 'div:has(> label:contains("Email Address")) input'
    companyCodeField = 'div:has(> label:contains("Company Code")) input'
    continueButton1 = 'button.is-bold:has(span:contains("Continue"))';
    continueButton2 = 'button.is-lower:has(span:contains("Continue"))';
    profileImage = 'button.is-edit';
    uploadImage = '.filepond--drop-label';
    uploadIcon = '.lnil-cloud-upload'
    doneButton = '[type="submit"]';
    signUpConfirmation = '#hubspot-conversations-iframe';
    

    
    validateSignUpObjects() {
        cy.get(this.title).should('be.visible');
        cy.get(this.subTitle).should('be.visible');
        cy.get(this.googleButton).should('be.visible');
        cy.get(this.firstNameField).should('be.visible');
        cy.get(this.lastNameField).should('be.visible');
        cy.get(this.emailField).should('be.visible');
        cy.get(this.continueButton1).should('be.visible');
    }

    generateRandomNumber() {
        return Math.floor(10000 + Math.random() * 90000);  // Generates a random number between 10000 and 99999
    }

    fillTestUserFields() {
        const randomNum = this.generateRandomNumber();
        
        cy.get(this.firstNameField).type(`Test FN ${randomNum}`);
        cy.get(this.lastNameField).type(`Test LN ${randomNum}`);
        cy.get(this.emailField).type(`test${randomNum}@email.com`);
        cy.get(this.continueButton1).click();
    }

    uploadProfileImage() {
        cy.get(this.profileImage).click();
        
        // Attach the image file using cypress-file-upload
        const imagePath = 'test-image.png';  
        cy.get('input[type="file"].filepond--browser').attachFile(imagePath);
        
        // Verify the image has been uploaded successfully
        cy.get('ul.filepond--list').find('li.filepond--item').should('contain.text', 'test-image.png');
        cy.get('.filepond--image-preview').should('be.visible');

        cy.get(this.continueButton2).click();
        
    }

    generateValidPassword() {
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
        // Ensure we get at least one of each required character type
        const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];
        
        let password = '';
        
        // Add one random character from each category
        password += getRandomChar(upperCaseChars);  // Add 1 uppercase letter
        password += getRandomChar(lowerCaseChars);  // Add 1 lowercase letter
        password += getRandomChar(numberChars);     // Add 1 number
        password += getRandomChar(specialChars);    // Add 1 special character
        
        // Generate remaining characters randomly from all character sets
        const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;
        for (let i = password.length; i < 8; i++) {
            password += getRandomChar(allChars);
        }
    
        // Shuffle the characters to ensure randomness
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        return password;
    }

    createsValidPassword() {
        const validPassword = this.generateValidPassword();

        // Select Password field using its exact label "Password"
        cy.contains('label', 'Password').parent().find('input[type="password"]').as('passwordField');

        // Select Confirm Password field using its exact label "Confirm Password"
        cy.contains('label', 'Confirm Password').parent().find('input[type="password"]').as('confirmPasswordField');

        // Check that checkboxes are not checked initially
        cy.get('label:contains("At least 8 characters")').find('input').should('not.be.checked');
        cy.get('label:contains("1 uppercase character")').find('input').should('not.be.checked');
        cy.get('label:contains("1 lowercase character")').find('input').should('not.be.checked');
        cy.get('label:contains("1 number")').find('input').should('not.be.checked');
        cy.get('label:contains("1 special character")').find('input').should('not.be.checked');

        // Type the valid password into the Password and Confirm Password fields
        cy.get('@passwordField').type(validPassword);
        cy.get('@confirmPasswordField').type(validPassword);

        // Verify that the checkboxes are checked after typing a valid password
        cy.get('label:contains("At least 8 characters")').find('input').should('be.checked');
        cy.get('label:contains("1 uppercase character")').find('input').should('be.checked');
        cy.get('label:contains("1 lowercase character")').find('input').should('be.checked');
        cy.get('label:contains("1 number")').find('input').should('be.checked');
        cy.get('label:contains("1 special character")').find('input').should('be.checked');

        
    }

    completeAndValidatesSignUp(){
        cy.get(this.doneButton).click();
    }


}

export const signUpPage = new SignUpPage();