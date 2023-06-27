beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User cannot submitt the Form when password and confirmation password are different', ()=>{
        cy.get('#username').type('Kavalants')
        cy.get('[data-cy="name"]').type('Ants')
        cy.get('#lastName').type('Kaval')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Ants1kaval')
        cy.get('[name="confirm"]').type('Ants2kaval') //Wrong conformation password
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')  //Assert that submit button is disabled
        cy.get('#password_error_message').should('be.visible')
    })

    it('User can submitt the Form when password and confirmation password are same', ()=>{
        cy.get('#username').type('Kavalants')
        cy.get('[data-cy="name"]').type('Ants')
        cy.get('#lastName').type('Kaval')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Ants1kaval')
        cy.get('[name="confirm"]').type('Ants1kaval')  //Conformation password matches
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#success_message').contains('User successfully submitted registration')
        cy.get('#applicationForm').submit()
        cy.get('#success_message').should('have.css', 'display', 'none')  //Assert that success message displayed
        cy.get('#success_message').invoke('removeAttr', 'style')
    })
    
    it('User can submit Form with all fields added', ()=>{
        cy.get('#username').type('Kavalants')
        cy.get('#email').type('kavalants@gmail.com')
        cy.get('[data-cy="name"]').type('Ants')
        cy.get('#lastName').type('Kaval')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#htmlFavLanguage').type('HTML')  //Fill all fields in the Form
        cy.get('#vehicle2').type('car')
        cy.get('#cars').type('volvo')
        cy.get('#animal').type('dog')
        cy.get('input[name="password"]').type('Ants1kaval')
        cy.get('[name="confirm"]').type('Ants1kaval')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#success_message').contains('User successfully submitted registration')
        cy.get('#applicationForm').submit()
        cy.get('#success_message').should('have.css', 'display', 'none')  //Assert that success message displayed
        cy.get('#success_message').invoke('removeAttr', 'style')
    })

    it('User can submit Form with valid data and only mandatory fields added', ()=>{  //Fill only mandatory fields
        cy.get('#username').type('Kavalants')
        cy.get('#email').type('kavalants@gmail.com')
        cy.get('[data-cy="name"]').type('Ants')
        cy.get('#lastName').type('Kaval')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Ants1kaval')
        cy.get('[name="confirm"]').type('Ants1kaval')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#success_message').contains('User successfully submitted registration')
        cy.get('#applicationForm').submit()
        cy.get('#success_message').should('have.css', 'display', 'none')  //Assert that success message displayed
        cy.get('#success_message').invoke('removeAttr', 'style')
    })

    it('Input valid data to the mandatory fields', () => {
        inputValidData()  //Use function where all mandatory fields are filled
        cy.get('.submit_button').should('be.visible')
        cy.get('#success_message').contains('User successfully submitted registration')
        cy.get('#applicationForm').submit()
        cy.get('#success_message').should('have.css', 'display', 'none')  //Assert that success message displayed
        cy.get('#success_message').invoke('removeAttr', 'style')
    })

    it('User cannot submit the Form without phone number', () => {
        inputValidData()  //Use function where all mandatory fields are filled
        cy.get('[data-testid="phoneNumberTestId"]').clear() //Remove phone number
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('[data-testid="phoneNumberTestId"]').should('contain', '')
        cy.get('#input_error_message').should('have.css', 'display', 'none')  //Assert that error message displayed
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot submit the Form without user name', () => {
        inputValidData()  //Use function where all mandatory fields are filled
        cy.get('input[data-testid="user"]').clear()  //Remove username
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[data-testid="user"]').should('contain', '')
        cy.get('#input_error_message').should('have.css', 'display', 'block')  //Assert that error message displayed
        cy.get('#success_message').should('not.be.visible')
    })


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').invoke('height').should('be.lessThan', 167)  
    })
    

    it('Check navigation element Registration form number 2 link', () => {
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

    it('Check navigation element Cerebrum Hub homepage link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Find second element of childrens
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'https://cerebrumhub.com/').click()
        cy.url().should('contain', 'https://cerebrumhub.com') // Check that currently opened URL is correct
        cy.go('back')  // Go back to the previous page
        cy.log('Back again in registration form 2')
            // To pass this test set the pageLoadTimeout to 15000 in Cypress
    })

    it('Check that Your Favourite Web Language radio button list is correct', () => {
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

        // To pass this test CSS radio button should be marked
    })

    it('Check that Your Favourite Transport checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)  // Assert that there is 3 choicec
            // Verify that all checkboxes are empty
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')
            // Mark two first checkboxes and let the third empty
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // To pass this test two first checkboxes should be marked
    })

    it('Check that Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given solution how to get the length of array of elements in Cars dropdown
        cy.get('#cars').children().should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Check that Animal dropdown is correct', () => {
        cy.get('select#animal option').as('animalOptions')  // Set up alias for animal drop-down menu ptions
        cy.get('@animalOptions').should('have.length', 6)   // Verify that the animal drop-down has 6 choices
        cy.get('@animalOptions').eq(3).should('have.text', 'Hippo') // Assert that 4-th choice is Hippo
            // Assert that animals options text matches with expected values
        cy.get('@animalOptions').eq(0).should('have.attr', 'value', 'dog').and('have.text', 'Dog')
        cy.get('@animalOptions').eq(1).should('have.attr', 'value', 'cat').and('have.text', 'Cat')
        cy.get('@animalOptions').eq(2).should('have.attr', 'value', 'snake').and('have.text', 'Snake')
        cy.get('@animalOptions').eq(3).should('have.attr', 'value', 'hippo').and('have.text', 'Hippo')
        cy.get('@animalOptions').eq(4).should('have.attr', 'value', 'spider').and('have.text', 'Cow')
        cy.get('@animalOptions').eq(5).should('have.attr', 'value', 'mouse').and('have.text', 'Horse')
            // After checking this test was found two bug:
            // 1. The 'Cow' value is 'spider', should be 'cow'
            // 2. The 'Horse' value is 'mouse', should be 'horse'
        })
    })
        
    })


function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Kavalants')
    cy.get('#email').type('kavalants@gmail.com')
    cy.get('[data-cy="name"]').type('Ants')
    cy.get('#lastName').type('Kaval')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    cy.get('#password').type('Ants1kaval')
    cy.get('#confirm').type('Ants1kaval')
}
