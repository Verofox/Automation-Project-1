beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: visual tests', ()=> {
    it('Check radio buttons and its content', () => {
        // Check names
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });

    it('Check Country dropdown options', () => {
        // Lenght should be 4
        cy.get('#country').find('option').should('have.length', 4)
        
        //Check if the text of the elements is correct
        cy.get('#country').find('option').eq(0).should('have.class', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
       
    })

    it('Check depencies between country and city dropdowns', () => {
        // Selecting Spain in country dropdown should update the city dropdown options
        cy.get('#country').select('Spain')
         // Asserting city dropdown
         cy.get('#city').should('be.enabled')

        // Check the city dropdown if selected Spain
        cy.get('#city').find('option').should('have.length', 5)
        
        //Check if the text of the elements is correct
        cy.get('#city').find('option').eq(0).should('have.class', '')
        cy.get('#city').find('option').eq(1).should('contain', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
    })

    it('Check depencies between country and city dropdowns', () => {
        // Selecting city 
        cy.get('#country').select('Spain')
        cy.get('#city').select('Madrid')
        cy.get('div').contains('Country').click()
        cy.get('#city option:selected').contains('Madrid')
    })

    it('Check depencies between 2', () => {
        // Select Estonia in country dropdown
        cy.get('#country').select('Estonia')
        // Asserting city dropdown
        cy.get('#city').should('be.enabled')
        // Check the city dropdown if selected Estonia
        cy.get('#city').find('option').should('have.length', 4)
        
        //Check if the text of the elements is correct
        cy.get('#city').find('option').eq(0).should('have.class', '')
        cy.get('#city').find('option').eq(1).should('contain', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
    
    })

    it('Check depencies between 2', () => {
        // Select Austria in country dropdown
        cy.get('#country').select('Austria')
        // Asserting city dropdown
        cy.get('#city').should('be.enabled')
        // Check the city dropdown if selected Austria
        cy.get('#city').find('option').should('have.length', 4)
        
        //Check if the text of the elements is correct
        cy.get('#city').find('option').eq(0).should('have.class', '')
        cy.get('#city').find('option').eq(1).should('contain', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    })

    it.only('Check depencies between 2', () => {
        
        cy.get('input[type="checkbox"]').should('have.length', 2)      
        cy.get('input[type="checkbox"]').first().should('have.text','Accept our pivacy policy').and('not.be.checked')
        cy.get('input[type="checkbox"]').last().should('have.text','Accept our cookie policy').and('not.be.checked')


        // Mualtiple checkboxes can be selected
        cy.get('input[type="checkbox"]').first().check().should('be.checked')
        cy.get('input[type="checkbox"]').last().check().should('be.checked')
        cy.get('input[type="checkbox"]').first().should('be.checked')
        cy.get('input[type="checkbox"]').last().should('be.checked')
    })
    


    });

//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */