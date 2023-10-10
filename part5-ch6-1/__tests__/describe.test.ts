// 스택 클래스
class Stack {
    private _items: Array<unknown>
    constructor() { this._items = []; }
    push(item: unknown) { this._items.push(item); }
    pop() {
        if (this.isEmpty()) {
            throw new Error("Error - Cannot pop from an empty stack");
        }
        return this._items.pop();
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error("Error - Cannot peek an empty stack");
        }
        return this._items[this._items.length - 1];
    }
    isEmpty() { return this._items.length === 0; }
}



// ------------------------------------------------------------------------
// Bad - 그룹 테스트 하기 위한 내부 describe block이 존재하지 않음
// "on an empty stack" 이나 "on a non-empty stack"이 각 테스트 제목에 있음을 확인

describe("Stack - Bad", () => {
    it("should return isEmpty as true if the stack is empty", () => {
        const stack = new Stack();

        expect(stack.isEmpty()).toBe(true);
    });

    it("should return isEmpty as false if the stack is non-empty", () => {
        const stack = new Stack();
        stack.push(123);

        expect(stack.isEmpty()).toBe(false);
    });

    it("should throw error when peeking on an empty stack", () => {
        const stack = new Stack();

        expect(() => stack.peek()).toThrowError(
            "Error - Cannot peek an empty stack"
        );
    });

    it("should return the top item when peeking a non-empty stack", () => {
        const stack = new Stack();
        stack.push(123);

        expect(stack.peek()).toEqual(123);
    });

    it("should throw an error when popping from an empty stack", () => {
        const stack = new Stack();

        expect(() => stack.pop()).toThrowError(
            "Error - Cannot pop from an empty stack"
        );
    });

    it("should return the top item when popping a non-empty stack", () => {
        const stack = new Stack();
        stack.push(123);

        expect(stack.pop()).toEqual(123);
    });
});

// ------------------------------------------------------------------------
// Better - 내부 describe블럭을 이용하여 그룹화
// beforeEach 를 사용해서 중복된 초기화 제거

describe("Stack - Better", () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack();
    });

    describe("empty stack", () => {
        it("should return isEmpty as true", () => {
            expect(stack.isEmpty()).toBe(true);
        });

        it("should throw error when peeking", () => {
            expect(() => stack.peek()).toThrowError(
                "Error - Cannot peek an empty stack"
            );
        });

        it("should throw an error when popping", () => {
            expect(() => stack.pop()).toThrowError(
                "Error - Cannot pop from an empty stack"
            );
        });
    });

    describe("non-empty stack", () => {
        beforeEach(() => {
            stack.push(123);
        });

        it("should return isEmpty as false", () => {
            expect(stack.isEmpty()).toBe(false);
        });

        it("should return the top item when peeking", () => {
            expect(stack.peek()).toEqual(123);
        });

        it("should return the top item when popping", () => {
            expect(stack.pop()).toEqual(123);
        });
    });
});
