// Test 할 코드
type Booking = {
    id: string
    userId: string
    locationId: string
    guests: number
    startDate: Date
    endDate: Date
}

function validateBooking(booking: Booking) {
    const validationMessages = [];

    if (booking.startDate >= booking.endDate) {
        validationMessages.push(
            "Error - Booking end date should be after the start date"
        );
    }
    if (!booking.guests) {
        validationMessages.push(
            "Error - Booking must have at least one guest"
        );
    }

    return validationMessages;
}
// ------------------------------------------------------------------------
// Bad - 유사한 Booking object를 반복해서 초기화
describe("ValidateBooking - Bad", () => {
    it("should return an error if the start and end date are the same", () => {
        const mockBooking = {
            id: "12345",
            userId: "67890",
            locationId: "ABCDE",
            guests: 2,
            startDate: new Date(2022, 10, 10),
            endDate: new Date(2022, 10, 10),
        };

        expect(validateBooking(mockBooking)).toEqual([
            "Error - Booking end date should be after the start date",
        ]);
    });

    it("should return an error if there are fewer than one guests", () => {
        const mockBooking = {
            id: "12345",
            userId: "67890",
            locationId: "ABCDE",
            guests: 0,
            startDate: new Date(2022, 10, 10),
            endDate: new Date(2022, 10, 12),
        };

        expect(validateBooking(mockBooking)).toEqual([
            "Error - Booking must have at least one guest",
        ]);
    });

    it("should return no errors if the booking is valid", () => {
        const mockBooking = {
            id: "12345",
            userId: "67890",
            locationId: "ABCDE",
            guests: 2,
            startDate: new Date(2022, 10, 10),
            endDate: new Date(2022, 10, 12),
        };

        expect(validateBooking(mockBooking)).toEqual([]);
    });
});

// ------------------------------------------------------------------------
// Better - 재사용 가능한 팩토리 function을 이용하여 Booking object 생성을 위임
describe("ValidateBooking - Better", () => {
    function createMockValidBooking() {
        return {
            id: "12345",
            userId: "67890",
            locationId: "ABCDE",
            guests: 2,
            startDate: new Date(2022, 10, 10),
            endDate: new Date(2022, 10, 12),
        };
    }

    it("should return an error if the start and end dates are the same", () => {
        const mockBooking = {
            ...createMockValidBooking(),
            startDate: new Date(2022, 10, 10),
            endDate: new Date(2022, 10, 10),
        };

        expect(validateBooking(mockBooking)).toEqual([
            "Error - Booking end date should be after the start date",
        ]);
    });

    it("should return an error if there are fewer than one guests", () => {
        const mockBooking = {
            ...createMockValidBooking(),
            guests: 0,
        };

        expect(validateBooking(mockBooking)).toEqual([
            "Error - Booking must have at least one guest",
        ]);
    });

    it("should return no errors if the booking is valid", () => {
        const mockBooking = createMockValidBooking();

        expect(validateBooking(mockBooking)).toEqual([]);
    });
});