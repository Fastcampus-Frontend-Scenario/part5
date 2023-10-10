// 5초 뒤 콜백을 수행하는 함수
function callInFive(callback: (args: unknown) => unknown) {
    setTimeout(callback, 5000);
}

// Bad - mockCallback 은 테스트 간에 reset 되지 않음
// 타이머는 하나의 테스트 수행 이후 클리어 되지 않음
describe("callInFive - Bad", () => {
    beforeEach(() => {
        // Using jest library to control passage of time within each test
        jest.useFakeTimers();
    })

    const mockCallback = jest.fn();

    it("should not call callback before five seconds elapse", () => {
        callInFive(mockCallback);

        jest.advanceTimersByTime(5000 - 1);

        expect(mockCallback).not.toHaveBeenCalled();
    });

    it("should call callback after five seconds elapse", () => {
        callInFive(mockCallback);

        jest.advanceTimersByTime(5000);

        expect(mockCallback).toHaveBeenCalled();
    });
});


// Better - We reset any ongoing timers and faked/mocked
// functions between tests.

describe("callInFive - Better", () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.resetAllMocks(); // 시작 전 mock reset 하기
    })
    afterEach(() => {
        jest.runOnlyPendingTimers(); // 남아있는 타이머 정리
        jest.useRealTimers(); // 실제 타이머로 변경
    })

    const mockCallback = jest.fn();

    it("should not call callback before five seconds elapse", () => {
        callInFive(mockCallback);

        jest.advanceTimersByTime(5000 - 1);

        expect(mockCallback).not.toHaveBeenCalled();
    });

    it("should call callback after five seconds elapse", () => {
        callInFive(mockCallback);

        jest.advanceTimersByTime(5000);

        expect(mockCallback).toHaveBeenCalled();
    });
});