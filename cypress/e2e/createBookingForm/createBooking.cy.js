import { faker } from "@faker-js/faker";
const rdmName = faker.person.fullName()             
const rmdNum = faker.phone.number()
const rdmEmail = faker.internet.exampleEmail()
const invalidEmail1 = faker.internet.email().replace('@', '')        // without @ "xxxxxx"
const invalidEmail2 = faker.internet.email().replace(/^.+@/, '@')    // without first part "@xxxx"
const invalidEmail3 = faker.internet.email().replace(/@.+$/, '@')    // without domain "xxxx@"
const invalidEmail4 = faker.internet.email().replace(/@.+$/, '@#')   // with special character in domain "xxxx@#"
const invalidEmail5 = faker.internet.email().replace(/^.+@/, '#@')   // with special character in frist part "#@xxxx"

describe("Create booking",()=>{
    beforeEach("Go to website",()=>{
        cy.visit("/");
        cy.fixture("home").then((the)=> {
            cy.get(the.newBookingBtn).click()
            cy.url().should("contain", "room_types") //micro assert
            cy.selectDateAvailable()                 //Select date available
            cy.url().should("contain", "new")        //micro assert
        })
    })
    it("TC1 - create booking",()=>{
                // booking confirmation form
        cy.fixture("createBookingPage").then((the)=>{
            cy.selectGuestCount()                    //select guests
            cy.selectRoom()                         //select number room
                    //Imput guest data
            cy.get(the.guestName).type(rdmName)
            cy.get(the.guestEmail).type(rdmEmail)
            cy.get(the.guestNum).type(rmdNum)
                        //take elements for assert
            cy.get('[name="start_date"]').invoke('val').then((startDateValue) => { 
                Cypress.env('startDate', startDateValue); 
            });        
            cy.get('[name="end_date"]').invoke('val').then((endDateValue) => {
                Cypress.env('endDate', endDateValue);  
            });
            cy.get("input[type='text']").eq(2).invoke('val').then((price)=>{
                Cypress.env("price", price)
            })
            cy.get(the.submitBtn).click()
                    //assert
            cy.then(() => {
                const startDate = Cypress.env('startDate');
                const endDate = Cypress.env('endDate');
                const price = Cypress.env('price')
                    //assert booking list
                cy.get(the.bookingList).last().should("contain", `${price}`)           //assert price
                cy.reformatDate(startDate).then((date)=>{                              //format date for assert
                    cy.get(the.bookingList).last().should("include.text", `${date}`)   //assert date checkin
                })
                cy.reformatDate(endDate).then((date)=>{                                //format date for assert
                    cy.get(the.bookingList).last().should("include.text", `${date}`)   //assert date checkout
                })
            });
        })   

    })
    it.only("TC2: - NOT create booking from ivalid guest count",()=>{
        cy.fixture("createBookingPage").then((the)=>{
            cy.get(the.guestCount).then((input) =>{         //Select invalid guest count
                const max = parseInt(input.attr("max"))
                const rdmInput = Cypress._.random(max+1, 10)
                cy.get(the.guestCount).type(rdmInput)
            })
            cy.selectRoom()   
            cy.get(the.guestName).type(rdmName)
            cy.get(the.guestEmail).type(rdmEmail)
            cy.get(the.guestNum).type(rmdNum)
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestCount, the.error.messageErrorCountGuest1)  // assert commands
            
            cy.get(the.guestCount).clear().type("0")        //Select 0 guest
            cy.validateError(the.guestCount, the.error.messageErrorCountGuest2)  // assert commands
            
        }) 
    })
    it("TC3: - NOT create by void field for Guest count(requiered)",()=>{
        cy.fixture("createBookingPage").then((the)=>{
            cy.selectRoom()   
            cy.get(the.guestName).type(rdmName)
            cy.get(the.guestEmail).type(rdmEmail)
            cy.get(the.guestNum).type(rmdNum)
            cy.get(the.submitBtn).click()
            //assert 
            cy.get(the.guestCount).then((input) => {
                // Verify invalid field
                expect(input[0].validity.valid).to.be.false;                        
                // Verify error message
                const validationMessage = input[0].validationMessage;
                expect(validationMessage).to.include(the.error.messageErrorVoid);
            });
        }) 
        
    })
    
    it("TC4: - NOT create booking by void field in Name (requiered)",()=>{
        cy.fixture("createBookingPage").then((the)=>{
            cy.selectGuestCount()
            cy.selectRoom()   
            cy.get(the.guestEmail).type(rdmEmail)
            cy.get(the.guestNum).type(rmdNum)
            cy.get(the.submitBtn).click()
            //assert 
            cy.get(the.guestName).then((input) => {
                // Verify invalid field
                expect(input[0].validity.valid).to.be.false;                        
                // Verify error message
                const validationMessage = input[0].validationMessage;
                expect(validationMessage).to.include(the.error.messageErrorVoid);
            });
        }) 
    })
    it("TC5: - NOT create booking from ivalid Email",()=>{
        cy.fixture("createBookingPage").then((the)=>{
            cy.selectGuestCount()
            cy.selectRoom()   
            cy.get(the.guestName).type(rdmName)
            cy.get(the.guestNum).type(rmdNum)
            cy.get(the.guestEmail).type(invalidEmail1)      // without @ "xxxxxxxx"
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestEmail, the.error.messageErrorEmail1) // assert commands
           
            cy.get(the.guestEmail).clear().type(invalidEmail2)    // without first part "@xxxx"  
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestEmail, the.error.messageErrorEmail2)  // assert commands
            
            cy.get(the.guestEmail).clear().type(invalidEmail3)      // without domain "xxxx@"
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestEmail, the.error.messageErrorEmail3)  // assert commands
             
            cy.get(the.guestEmail).clear().type(invalidEmail4)      // with special character in domain "xxxx@#"
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestEmail, the.error.messageErrorEmail4)  // assert commands
            
            cy.get(the.guestEmail).clear().type(invalidEmail5)      // with special character in first part "#@xxxx"
            // cy.get(the.submitBtn).click()
            cy.validateError(the.guestEmail, the.error.messageErrorEmail5)  // assert commands
        })
    })
    it("TC6: - NOT create booking by void field in Email (requiered)",()=>{
        cy.fixture("createBookingPage").then((the)=>{
            cy.selectGuestCount()
            cy.selectRoom()   
            cy.get(the.guestName).type(rdmName)
            cy.get(the.guestNum).type(rmdNum)
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestEmail, the.error.messageErrorVoid)  // assert commands
        })    
    })
    it("TC7: - NOT create booking by void field in Number (requiered)",()=>{
        cy.fixture("createBookingPage").then((the)=>{
            cy.selectGuestCount()
            cy.selectRoom()   
            cy.get(the.guestEmail).type(rdmEmail)
            cy.get(the.guestName).type(rdmName)
            cy.get(the.submitBtn).click()
            cy.validateError(the.guestNum, the.error.messageErrorVoid)   // assert commands
        }) 
    })
})
