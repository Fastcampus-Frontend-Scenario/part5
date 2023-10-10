import useOpen from '@/hooks/useOpen';
import { render, renderHook, act } from '@testing-library/react';

// BAD
// test('Check initial value of isOpen is false', () => {
//     const result = useOpen()
//     expect(result.open).toBe(false)
// });
/**
 *     Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
 *    1. You might have mismatching versions of React and the renderer (such as React DOM)
 *    2. You might be breaking the Rules of Hooks
 *    3. You might have more than one copy of React in the same app
 *    See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
 */


// NORM
test('Check initial value of isOpen is false', () => {
    // arrange
    let useOpenRes = {} as ReturnType<typeof useOpen>;
    const Wrapper = () => {
        useOpenRes = useOpen(true)
        return <></>;
    };
    // act
    render(<Wrapper />);
    // assert
    expect(useOpenRes.open).toBe(true);
});
// useOpenRes 변수 선언
// Wrapper component를 생성하고 useOpenRes에 hook의 return값을 대입
// render() 이후에 해당 변수의 값을 assertion

// BETTER
test('Check initial value of isOpen is false', () => {
    const { result } = renderHook(() => useOpen());
    expect(result.current.open).toBe(false);
});
// renderHook 함수 안에 callback 함수로서 useOpen hook 수행
// return object의 result 속성을 통해 값을 확인할 수 있다.
// result.current = 콜백함수가 마지막으로 리턴한 값
// current -> 커스텀 훅은 여러번 호출 가능하기에 마지막 실행값인 current를 참조


test('Check isOpen updated when setOpen is called', () => {
    // arange
    const { result } = renderHook(() => useOpen())
    expect(result.current.open).toBe(false)
    // act
    act(() => result.current.setOpen(true))
    // assert
    expect(result.current.open).toBe(true)
});