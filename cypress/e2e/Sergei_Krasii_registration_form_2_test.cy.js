beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Filling in only mandatory fields
        cy.get('#username').type('serjiok')
        cy.get('#email').type('some@maillll.com')
        cy.get('input[name="name"]').type('Serjio')
        cy.get('input[name="lastName"]').type('Krasijio')
        cy.get('input[data-testid="phoneNumberTestId"]').type('656565656')     
        cy.get('input[name="password"]').type('12345')
        cy.get('input[name="confirm"]').type('12345')

        // Assert that submit button is not enabled
        cy.get('button.submit_button').should('be.disabled')

        // Forcing a click regardless of its actionable state to activate the assertion of the password matching
        cy.get('label').contains('Confirm').click({ force: true })
        
        // Assert that error message is not visible
        cy.get('#password_error_message').should('be.not.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        // Filling in ALL fields
        
        // Mandatory fields
        cy.get('#username').type('serjiok')
        cy.get('#email').type('some@maillll.com')
        cy.get('input[name="name"]').type('Serjio')
        cy.get('input[name="lastName"]').type('Krasijio')
        cy.get('input[data-testid="phoneNumberTestId"]').type('656565656')
        cy.get('input[name="password"]').type('12345')
        cy.get('input[name="confirm"]').type('12345')

        // Optional fields
        cy.get('#javascriptFavLanguage').check()
        cy.get('.checkbox.vehicles').check(['Car', 'Bike'])
        cy.get('select[name="cars"]').select('audi')
        cy.get('select[name="animal"]').select('Cow')   

        // Forcing a click regardless of its actionable state to activate the assertion of the password matching
        cy.get('label').contains('Confirm').click({ force: true })

        // Assert that error message is not visible
        cy.get('#password_error_message').should('be.not.visible')

        // Assert that submit button is enabled
        cy.get('button.submit_button').as('submitBtn')
        cy.get('@submitBtn').should('be.enabled')
        cy.get('@submitBtn').click()
        
        // Asserting that error message shoud not be visible
        cy.get('#input_error_message').should('not.be.visible')

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username').type('serjiok')
        cy.get('#email').type('some@maillll.com')
        cy.get('input[name="name"]').type('Serjio')
        cy.get('input[name="lastName"]').type('Krasijio')
        cy.get('input[data-testid="phoneNumberTestId"]').type('656565656')

        cy.get('input[name="password"]').type('12345')
        cy.get('input[name="confirm"]').type('12345')

        // Forcing a click regardless of its actionable state to activate the assertion of the password matching
        cy.get('label').contains('Confirm').click({ force: true })

        // Assert that error message is not visible
        cy.get('#password_error_message').should('be.not.visible')

        // Assert that submit button is enabled
        cy.get('button.submit_button').as('submitBtn')
        cy.get('@submitBtn').should('be.enabled')
        cy.get('@submitBtn').click()
        
        // Asserting that error message shoud not be visible
        cy.get('#input_error_message').should('not.be.visible')

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible')

    })

    it('Verify that the submit button is not enabled when some mandatory field is not filled', ()=>{
       
        fillMandatoryFields()

        // Clearing field to test with
        // cy.get('#email').clear()
        cy.get('input[name="name"]').clear()

        // Forcing a click regardless of its actionable state to activate the form validation
        cy.get('label').contains('Confirm').click({ force: true })

        // Asserting that error message shoud be visible
        cy.get('#input_error_message').should('be.visible')

        // Assert that submit button is enabled
        cy.get('button.submit_button').should('be.disabled')
        
        // Asserting that successful message shoud not be visible
        cy.get('#success_message').should('not.be.visible')

    })

    // Experimental looped test case to check behaviour of submit button with each empty mandatory field (by Sergei Krasii)
    // 2023-06-17: Should fail, since 'Submit' button is not disabled when 'email' field is empty
    it('Verify each mandatory field. Check that the submit button is not enabled if one is not filled', ()=>{

        const mandatoryFieldSelectors = [
            '#username',
            '#email',
            'input[name="name"]',
            'input[name="lastName"]',
            'input[data-testid="phoneNumberTestId"]',
            'input[name="password"]',
            'input[name="confirm"]',
        ]
        
        // looping trough each mandatory field
        mandatoryFieldSelectors.forEach((fieldSelector) => {
            //Filling in all mandatory fields
            fillMandatoryFields()
            
            cy.log(`Testing with empty field: ${fieldSelector}`)

            //Clearing one of mandatory fields to test with
            cy.get(fieldSelector).clear()

            // Forcing a click regardless of its actionable state to activate the form validation
            cy.get('label').contains('Confirm').click({ force: true })
    
            // Asserting that error message shoud be visible
            cy.get('#input_error_message').should('be.visible')
    
            // Assert that submit button is enabled
            cy.get('button.submit_button').should('be.disabled')
            
            // Asserting that successful message shoud not be visible
            cy.get('#success_message').should('not.be.visible')

            cy.log(`Finished with field: ${fieldSelector} `)
            
        })
       
    })

    it('Input valid data to the page', () => {
        inputValidData('john.doe')
    })

    // You can add more similar tests for checking other mandatory field's absence

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check Cerebrum Hub logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)

        // assert Cerebrum Hub logo alt attribute contains 'cerebrum_hub' text
        // cy.get('@cypressLogoImg').should('have.attr', 'alt').and('include', 'cerebrum_hub')
    })

    // Create similar test for checking second picture
    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        
        // get Cypress logo, assigning alias
        cy.get('img[data-cy="cypress_logo"]').as('cypressLogoImg')

        // assert src contains cypress logo file name
        cy.get('@cypressLogoImg').should('have.attr', 'src').should('include', 'cypress_logo')
        
        // get element and check its parameter height, to be < 100 and > 80
        cy.get('@cypressLogoImg').invoke('height').should('be.lessThan', 100)
        .and('be.greaterThan', 80)
        
        // assert Cypress logo alt attribute contains 'cypress' text
        // cy.get('@cypressLogoImg').should('have.attr', 'alt').and('include', 'cypress')
        

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

    // Check that URL to Cerebrum Hub page is correct and clickable
    it('Check Cerebrum Hub homepage link exist, clickable and opens correct page.', () => {

        // assert there is "Cerebrum Hub homepage" nav element
        cy.get('nav a').contains('Cerebrum Hub homepage').as('cerebrumHomeLink')

        // check the link content and click it
        cy.get('@cerebrumHomeLink').should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        
        // check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        // go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
  
    it('Check that checkbox list is correct', () => {
        // check there are three checkbox buttons 
        cy.get('input[type="checkbox"]').should('have.length', 3).as('checkboxes')

        // check checkobx lables to have correct text
        cy.get('@checkboxes').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('@checkboxes').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('@checkboxes').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        // marking the first and second checkboxes as checked and assert their state
        cy.get('@checkboxes').eq(0).check().should('be.checked')
        cy.get('@checkboxes').eq(1).check().should('be.checked')

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

    // Check that the dropdown of favorite animals is correct (by Sergei Krasii)
    // Verify all values in the dropdown based on option's text.
    it('Favorite animals dropdown is correct', () => {

        cy.get('h2').contains('Select your favourite animal').scrollIntoView()

        // asigning alias for animal dropdown options
        cy.get('select#animal option').as('animalOptions')

        // Verify that the animal dropdown has six choices.
        cy.get('@animalOptions').should('have.length', 6)

        // solution v1
        // get list of all animal options and loop trough them
        cy.get('@animalOptions').each((option) => {
            
            // assert animal otpion's text equals to option's value 
            cy.get(option).invoke('text').then((optionString) => {
                // saving option's text for comparison
                const expectedValue = optionString.toLowerCase();     
                // getting value and comparing to option's text
                cy.get(option).invoke('val').should('eq', expectedValue)      
  
            })

        }).then(() => {
            cy.log('Options checked!')
        })

        // solution v2
        // cy.get('@animalOptions').eq(0).should('have.attr', 'value', 'dog').and('have.text', 'Dog')
        // cy.get('@animalOptions').eq(1).should('have.attr', 'value', 'cat').and('have.text', 'Cat')
        // cy.get('@animalOptions').eq(2).should('have.attr', 'value', 'snake').and('have.text', 'Snake')
        // cy.get('@animalOptions').eq(3).should('have.attr', 'value', 'hippo').and('have.text', 'Hippo')
        // cy.get('@animalOptions').eq(4).should('have.attr', 'value', 'cow').and('have.text', 'Cow')
        // cy.get('@animalOptions').eq(5).should('have.attr', 'value', 'horse').and('have.text', 'Horse')      
        
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

function fillMandatoryFields() {
    cy.log('Mandatory fields will be filled')

    cy.get('#username').type('serjiok')
    cy.get('#email').type('some@maillll.com')
    cy.get('input[name="name"]').type('Serjio')
    cy.get('input[name="lastName"]').type('Krasijio')
    cy.get('input[data-testid="phoneNumberTestId"]').type('656565656')

    cy.get('input[name="password"]').type('12345')
    cy.get('input[name="confirm"]').type('12345')
}