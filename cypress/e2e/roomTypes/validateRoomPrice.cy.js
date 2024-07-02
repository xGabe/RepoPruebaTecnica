describe("Validate price for room",()=>{
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
                    const roomTypes = ['simple', 'double', 'triple', 'quadruple'];
                    const roomCosts = roomTypes.map(roomType => Days * the[roomType]);
                    // assert value for the stay
                    roomCosts.forEach((cost, index) => {
                        cy.get("tbody tr").eq(index).should("contain.text", cost);
                      });
                    cy.fixture("roomsType").then((the)=>{
                        cy.get(the.nextStep).eq(rdmIndex).click()
                    })
                    //assert value in booking form
                        cy.fixture("createBookingPage").then((the)=>{
                            cy.get(the.inputText).eq(2).invoke('val').then((price)=>{
                                expect(price).deep.equal(priceRoomType)
                            })
                        })
                })
            })
        })

        
    })
})
