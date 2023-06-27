beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

import { faker } from '@faker-js/faker'
const randomEmail = faker.internet.email()
const randomName = faker.person.firstName()
const randomLastname = faker.person.lastName()

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Type confirmation password which is different from first password
        cy.get('#username').type('Elephant')
        cy.get('#email').type(randomEmail)
        cy.get('[data-cy="name"]').type(randomName)
        cy.get('#lastName').type(randomLastname)
        cy.get('[data-testid="phoneNumberTestId"]').type('56789056')
        cy.get('#password').type('BetterDays')
        cy.get('#confirm').type('Awesome')
        cy.get('h2').contains('Password').click()
        //Check the error message
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        //Clear password and confirm fields
        cy.get('#confirm').clear()
        //Type matching passwords and check that submit button is enabled and error message is not visible
        cy.get('#confirm').type('BetterDays')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#success_message').should('not.be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('Elephant')
        cy.get('#email').type(randomEmail)
        cy.get('[data-cy="name"]').type(randomName)
        cy.get('#lastName').type(randomLastname)
        cy.get('[data-testid="phoneNumberTestId"]').type('56789056')
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#vehicle3').click()
        cy.get('#cars').select('saab').should('have.value','saab')
        cy.get('#animal').select('hippo').should('have.value','hippo')
        cy.get('#password').type('BetterDays')
        cy.get('#confirm').type('BetterDays')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        //Check that the success message is displayed
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('Elephant')
        cy.get('#email').type(randomEmail)
        cy.get('[data-cy="name"]').type(randomName)
        cy.get('#lastName').type(randomLastname)
        cy.get('[data-testid="phoneNumberTestId"]').type('56789056')
        cy.get('#password').type('BetterDays')
        cy.get('#confirm').type('BetterDays')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        //Check that the success message is displayed
        cy.get('#success_message').should('be.visible')
    })

    it('User can not submit form with empty username field', () => {
        inputValidData('john.doe')
        //Check that submit button is disabled when username field is empty
        cy.get('#username').clear()
        cy.get('h3').contains('Input email').click()
        cy.get('.submit_button').should('be.disabled')
        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')
        //Check that correct error message is displayed
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })

    it('User can not submit form with empty first name field', () => {
        inputValidData('john.doe')
        //Check that submit button is disabled when first name field is empty
        cy.get('[data-cy="name"]').clear()
        cy.get('h2').contains('Last name').click()
        cy.get('.submit_button').should('be.disabled')
        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')
        //Check that correct error message is displayed
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })

    it('User can not submit form with empty last name field', () => {
        inputValidData('john.doe')
        //Check that submit button is disabled when last name field is empty
        cy.get('#lastName').clear()
        cy.get('h2').contains('Phone number').click()
        cy.get('.submit_button').should('be.disabled')
        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')
        //Check that correct error message is displayed
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })

    it('User can not submit form with empty phone number field', () => {
        inputValidData('john.doe')
        //Check that submit button is disabled when phone number field is empty
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Phone number').click()
        cy.get('.submit_button').should('be.disabled')
        // Scroll to bottom of the page. No error message is displayed!!
        cy.window().scrollTo('bottom')
    })

    it('User can not submit form with empty email field', () => {
        inputValidData('john.doe')
        //Check that submit button is disabled when email field is empty
        cy.get('#email').clear()
        cy.get('h2').contains('First name').click()
        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')
        //Error message is visible
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        //Submit button should be disabled, but it is enabled!
        cy.get('.submit_button').should('be.disabled')
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

    it('Check that cypress logo is correct and has correct size', () => {
        cy.log('Will check cypress_logo source and size')
        cy.get('img[data-cy="cypress_logo"').should('have.attr', 'src').should('include', 'cypress_logo')
        // Check the elements' parameter height (must be equal to 88)
        cy.get('img[data-cy="cypress_logo"').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 86)
    })

    it('Check navigation part - registration form 1', () => {
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
        //Check the navigation elements' second child and its link content
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        
        //Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        //Go back to previous page
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
        //Checkbox list should have 3 elements in total
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')
        
        //Multiple checkboxes can be selected
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
        //Length of the dropdown
        cy.get('#animal').scrollIntoView()
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        
        //Check that the elements' values are correct
        cy.get('#animal').find('option').eq(0).should('have.value', 'dog')
        cy.get('#animal').find('option').eq(1).should('have.value', 'cat')
        cy.get('#animal').find('option').eq(2).should('have.value', 'snake')
        cy.get('#animal').find('option').eq(3).should('have.value', 'hippo')
        cy.get('#animal').find('option').eq(4).should('have.value', 'spider')
        cy.get('#animal').find('option').eq(5).should('have.value', 'mouse') 
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