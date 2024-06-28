describe("Check room types",()=>{
    beforeEach("Go to website",()=>{
        cy.visit("/");
    })
    it("create booking",()=>{
        cy.fixture("home").then((the)=> {
            cy.get(the.newBookingBtn).click()
            cy.url().should("contain", "room_types") //micro assert
        })
        cy.daySelect().then((randomDates)=>{
            const [date1,date2] = randomDates
            cy.calculateDays(date1,date2).then((Days)=>{
                const cost1 = Days*20  //single room
                const cost2 = Days*30  //double room
                const cost3 = Days*40  //triple room 
                const cost4 = Days*50  //quadruple room
                // assert value for the stay
                cy.get("tbody tr").eq(0).should("contain.text", cost1) //single room
                cy.get("tbody tr").eq(1).should("contain.text", cost2) //double room
                cy.get("tbody tr").eq(2).should("contain.text", cost3) //triple room
                cy.get("tbody tr").eq(3).should("contain.text", cost4) //quadruple room
            })
        })

        
    })
})
