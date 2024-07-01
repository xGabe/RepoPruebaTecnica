describe("Validate price for room and ",()=>{
    beforeEach("Go to website",()=>{
        cy.visit("/");
    })
    it("Validate price for room",()=>{
        cy.fixture("home").then((the)=> {
            cy.get(the.newBookingBtn).click()
            cy.url().should("contain", "room_types") //micro assert
        })
        cy.selectDateAvailable().then(({ startDate, endDate, priceRoomType, rdmIndex })=>{
            cy.fixture("priceRooms").then((the)=>{
                cy.calculateDays(startDate,endDate).then((Days)=>{
                    const cost1 = Days*the.simple  //single room
                    const cost2 = Days*the.double  //double room
                    const cost3 = Days*the.triple  //triple room 
                    const cost4 = Days*the.quadruple  //quadruple room
                    // assert value for the stay
                    cy.get("tbody tr").eq(0).should("contain.text", cost1) //single room
                    cy.get("tbody tr").eq(1).should("contain.text", cost2) //double room
                    cy.get("tbody tr").eq(2).should("contain.text", cost3) //triple room
                    cy.get("tbody tr").eq(3).should("contain.text", cost4) //quadruple room
                    cy.fixture("roomsType").then((the)=>{
                        cy.get(the.nextStep).eq(rdmIndex).click()
                    })
                    //assert value in booking form
                    // cy.selectRoomType().then((priceRoomType)=>{
                        cy.fixture("createBookingPage").then((the)=>{
                            cy.get(the.inputText).eq(2).invoke('val').then((price)=>{
                                expect(price).deep.equal(priceRoomType)
                            })
                        })
                    // })
                })
            })
        })

        
    })
})
