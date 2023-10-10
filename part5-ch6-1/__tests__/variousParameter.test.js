
function initArray(length, value) {
    // 의도하지 않은 문제점
    // length 가 0 인 경우 에러를 발생시킨다. 
    if (!length) {
        throw new Error(
            "Invalid parameter length - must be a number greater or equal to 0"
        );
    }

    return new Array(length).fill(0).map(() => value);
}

// Bad - 테스트는 pass 하지만, length가 0 이하인 경우는 체크하지 않음
describe("initArray - Bad", () => {
    it("should create an array of given size filled with the same value", () => {
        expect(initArray(3, { id: 123 })).toEqual([
            { id: 123 },
            { id: 123 },
            { id: 123 },
        ]);
    });

    it("should throw an error if the array length parameter is invalid", () => {
        expect(() => initArray(undefined, { id: 123 })).toThrowError();
    });
});

// Better - length 0, -1인 경우 테스트
describe("initArray - Better", () => {
    it("should create an array of given size filled with the same value", () => {
        expect(initArray(3, { id: 123 })).toEqual([
            { id: 123 },
            { id: 123 },
            { id: 123 },
        ]);
    });

    it("should handle an array length parameter of 0", () => {
        expect(initArray(0, { id: 123 })).toEqual([]);
    });

    it("should throw an error if the array length parameter is -1", () => {
        expect(() => initArray(-1, { id: 123 })).toThrowError();
    });

    it("should throw an error if the array length parameter is invalid", () => {
        expect(() => initArray(undefined, { id: 123 })).toThrowError();
    });
});



// Better - fast-check 프레임워크를 이용해서 test case 생성
describe("initArray - Better - Using fast-check", () => {
    it("should return an array of specified length", () =>
        fc.assert(
            fc.property(
                fc.integer({ min: 0, max: 100 }),
                fc.anything(),
                (length, value) => {
                    expect(initArray(length, value).length).toEqual(length);
                }
            )
        ));

    it("should throw an error if initialising array of length < 0", () =>
        fc.assert(
            fc.property(
                fc.integer({ max: -1 }),
                fc.anything(),
                (length, value) => {
                    expect(() => initArray(length, value)).toThrowError();
                })
        ));
});