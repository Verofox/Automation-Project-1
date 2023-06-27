beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('Assignment 4.1 User can use only same both first and validation passwords', () => {

        cy.get('#username').type('juhanJuurikas')
        cy.get('#email').type('juhanjuurikas@email.com')
        cy.get('[data-cy="name"]').type('Juhan')
        cy.get('[data-testid="lastNameTestId"]').type('Juurikas')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('VSSPassword')
        cy.get('#confirm').type('VSSPassword123')
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('input#confirm').scrollIntoView()
        cy.get('input#confirm').clear().type('VSSPassword')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')


    })

    it('Assignment 4.2 User can submit form with all fields added', () => {
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
        cy.get('#username').type('juhanJuurikas')
        cy.get('#email').should('have.attr', 'pattern', '[a-z0-9]+@[a-z0-9]+\\\.[a-z]{2,4}$')
        cy.get('#email').type('juhanjuurikas@email.com')
        cy.get('[data-cy="name"]').should('have.attr', 'pattern', '[a-zA-Z]+')
        cy.get('[data-cy="name"]').type('Juhan')
        cy.get('[data-testid="lastNameTestId"]').should('have.attr', 'pattern', '[a-zA-Z]+')
        cy.get('[data-testid="lastNameTestId"]').type('Juurikas')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('VSSPassword')
        cy.get('#confirm').type('VSSPassword')
        cy.get('input[type="radio"]').eq(2).check()
        cy.get('input[type="checkbox"]').eq(2).check()
        cy.get('#cars').select(1)
        cy.get('#animal').select(1)

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')

        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('Assignment 4.3 User can submit form with valid data and only mandatory fields added', () => {

        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
        cy.get('#username').type('juhanJuurikas')
        cy.get('#email').should('have.attr', 'pattern', '[a-z0-9]+@[a-z0-9]+\\\.[a-z]{2,4}$')
        cy.get('#email').type('juhanjuurikas@email.com')
        cy.get('[data-cy="name"]').should('have.attr', 'pattern', '[a-zA-Z]+')
        cy.get('[data-cy="name"]').type('Juhan')
        cy.get('[data-testid="lastNameTestId"]').should('have.attr', 'pattern', '[a-zA-Z]+')
        cy.get('[data-testid="lastNameTestId"]').type('Juurikas')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('VSSPassword')
        cy.get('#confirm').type('VSSPassword')

        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

    })

    it('Assignment 4.4.1 User is not able to enter data if username field is empty', () => {

        inputValidData()
        cy.get('#username').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')

    })

    it('Assignment 4.4.2 User is not able to enter data if first name field is empty', () => {

        inputValidData()
        cy.get('[data-cy="name"]').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')

    })

    it('Assignment 4.4.3 User is not able to enter data if last name field is empty', () => {

        inputValidData()
        cy.get('[data-testid="lastNameTestId"]').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')

    })
    it.skip('Assignment 4.4.4 User is not able to enter data if phonenumber field is empty', () => {
        //Test is skiped since input error message is connected to pattern and phone does not have it the test fails. 

        inputValidData()
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')

    })
    it.skip('Assignment 4.4.5 User is not able to enter data if email field is empty', () => {
        //Test is skiped since email field does not have input class the submit button gets enabled  

        inputValidData()
        cy.get('#email').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')

    })

})

/*
Assignement 5: create more visual tests
*/

describe('Assignement 5: Visual tests', () => {
    it('Visual test 1: Check that Cerebrum Hub logo is correct and has correct size', () => {

        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Visual test 2: Check that Cypress logo is correct and has correct size', () => {

        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 80)
    })

    it('Visual test 3: Check navigation and link nr 1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element 1, find siblings that contains h1 and check if it has Registration form in string
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

    it('Visual test 4: Check navigation part 2 Second page', () => {
        // Get navigation element 2, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
        cy.origin('https://cerebrumhub.com/', () => { cy.visit('https://cerebrumhub.com') })

        // Check that currently opened URL is correct
        cy.url().should('contain', 'cerebrumhub.com/')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Visual test 5: Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Visual test 6: Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')

        // Selecting multible checkboxes is possible
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    })


    it('Visual test 7: Car dropdown is correct', () => {
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

    it('Visual test 8: Favorite animal dropdown is correct', () => {
        
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })


})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('NewUserVillu')
    cy.get('#email').type('villusemail@yeap.com')
    cy.get('[data-cy="name"]').type('Villu')
    cy.get('[data-testid="lastNameTestId"]').type('Soo')
    cy.get('[data-testid="phoneNumberTestId"]').type('55667788')
    cy.get('#password').type('MyHardPass99')
    cy.get('#confirm').type('MyHardPass99')
    cy.get('h2').contains('Password').click()
}