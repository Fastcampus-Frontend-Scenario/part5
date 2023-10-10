// Bad - 하나의 테스트가 pop 함수에 대해서 두가지 테스트 케이스를 다룬다
// 하나의 test 안에서 2번의 expect 호출
describe("Stack - Bad", () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it("should only allow popping when the stack is non-empty", () => {
        expect(() => stack.pop()).toThrowError();

        stack.push(123);
        expect(stack.pop()).toEqual(123);
    });
});

// ------------------------------------------------------------------------
// Better - 하나의 테스트는 하나의 expect를 호출, 하나의 테스크 케이스를 다룬다

describe("Stack - Better", () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it("should throw an error when popping from an empty stack", () => {
        expect(() => stack.pop()).toThrowError();
    });

    it("should return the top item when popping a non-empty stack", () => {
        stack.push(123);

        expect(stack.pop()).toEqual(123);
    });
});