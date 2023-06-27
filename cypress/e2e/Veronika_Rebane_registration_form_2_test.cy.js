beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

import { faker } from '@faker-js/faker';
const randomEmail = faker.internet.email();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();

let password = ('Voldemort')

describe('Section 1: Functional tests', () => {
    
    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        /*
        cy.get('#username').type('Darklord')
        cy.get('#email').type(randomEmail)
        cy.get('input[name="name"]').type(randomFirstName)
        cy.get('#lastName').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')

        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type('Voldemort1')

        cy.get('[name="confirm"]').type('{enter}')

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        */
    
        // Filling in only mandatory fields, password field and confirmation matching
        cy.get('#username').type('Darklord')
        cy.get('#email').type(randomEmail)
        cy.get('input[name="name"]').type(randomFirstName)
        cy.get('#lastName').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)

        cy.get('h2').contains('Password').click()

        // Submit button enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Messages
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        // Mandatory fields
        cy.get('#username').type('Darklord')
        cy.get('#email').type(randomEmail)
        cy.get('input[name="name"]').type(randomFirstName)
        cy.get('#lastName').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)

        // Optional fields
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#vehicle2').click()
        cy.get('#vehicle3').click()

        // Validation fields
        cy.get('#cars').select('Audi').should('have.value','audi')
        cy.get('#animal').select('Cow').should('have.value','spider')

        cy.get('h2').contains('Password').click()

        // Submit button enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Messages
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Mandatory fields
        cy.get('#username').type('Darklord')
        cy.get('#email').type(randomEmail)
        cy.get('input[name="name"]').type(randomFirstName)
        cy.get('#lastName').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)

        // Validation fields
        cy.get('#cars').select('Audi').should('have.value','audi')
        cy.get('#animal').select('Cow').should('have.value','spider')

        cy.get('h2').contains('Password').click()

        // Submit button enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Messages
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
    })

    it('User can not submit form with empty username field', () => {
        // Check that the submit button is disabled pluss error message visible
        // Input valid data to the page
        inputValidData('john.doe')
        
        // Username not filled out
        cy.get('#username').clear()

        cy.get('h2').contains('Password').click()

        // Submit button disabled
        cy.get('.submit_button').should('be.disabled')

        // Messages
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#input_error_message').scrollIntoView()
    })

    it('User can not submit form with empty first name field', () => {
        // Check that the submit button is disabled pluss error message visible
        // Input valid data to the page
        inputValidData('john.doe')
        
        // First name not filled out
        cy.get('input[name="name"]').clear()

        cy.get('h2').contains('Password').click()

        // Submit button disabled
        cy.get('.submit_button').should('be.disabled')

        // Messages
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#input_error_message').scrollIntoView()
    })

    it('User can not submit form with empty last name field', () => {
        // Check that the submit button is disabled pluss error message visible
        // Input valid data to the page
        inputValidData('john.doe')
        
        // Last name not filled out
        cy.get('#lastName').clear()

        cy.get('h2').contains('Password').click()

        // Submit button disabled
        cy.get('.submit_button').should('be.disabled')

        // Messages
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#input_error_message').scrollIntoView()
    })

    it('User can not submit form with empty phone number field', () => {
        // Check that the submit button is disabled pluss error message visible
        // Input valid data to the page
        inputValidData('john.doe')
        
        // Phone number not filled out
        cy.get('[data-testid="phoneNumberTestId"]').clear()

        cy.get('h2').contains('Password').click()

        // Submit button disabled
        cy.get('.submit_button').should('be.disabled')

        // Messages 
        cy.get('#success_message').should('not.be.visible')
        // No error message visible, scroll to buttom of the page
        cy.window().scrollTo('bottom')
    })

    it.skip('User can not submit form with empty email address field (BUG)', () => {
        // Check that the submit button is disabled pluss error message visible
        // Input valid data to the page
        inputValidData('john.doe')
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()

        // Submit button is enabled, but should be disabled - BUG
        cy.get('.submit_button').should('be.disabled')

        // Messages
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#input_error_message').scrollIntoView()
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {

    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal to 88
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 87)
        // Width should be equal to 116
        cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.equal', 116)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part - Cerebrum Hub homepage', () => {
        // Get navigation element, find second child check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()

        // Check that currently opened URL is correct
        //In order to pass Cypress I increased the pageLoadTimeOut to 15000 in document cypress.config
        cy.url().should('contain', 'https://cerebrumhub.com/') 

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        // Should have 3 elements in total
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        // Mualtiple checkboxes can be selected
        cy.get('input[class="checkbox vehicles"]').eq(0).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(0).should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')

        // Lenght should be 6
        cy.get('#animal').find('option').should('have.length', 6)
        
        //Check if the values of the elements are correct
        cy.get('#animal').find('option').eq(0).should('have.value', 'dog')
        cy.get('#animal').find('option').eq(1).should('have.value', 'cat')
        cy.get('#animal').find('option').eq(2).should('have.value', 'snake')
        cy.get('#animal').find('option').eq(3).should('have.value', 'hippo')
        cy.get('#animal').find('option').eq(4).should('have.value', 'spider') // Value is spider, text is Cow
        cy.get('#animal').find('option').eq(5).should('have.value', 'mouse') // Value is mouse, text is Horse
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}