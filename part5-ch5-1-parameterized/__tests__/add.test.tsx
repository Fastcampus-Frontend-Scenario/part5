const add = (x: number, y: number) => x + y
describe('add function', () => {
    it('0,0을 더할 때 올바른 결과값을 반환해야 한다.', () => {
        expect(add(0, 0)).toEqual(0)
    })
    it('-1, 1을 더할 때 올바른 결과값을 반환해야 한다.', () => {
        expect(add(-1, 1)).toEqual(0)
    })
    it('100,0을 더할 때 올바른 결과값을 반환해야 한다.', () => {
        expect(add(100, 0)).toEqual(100)
    })
    it('1000,100을 더할 때 올바른 결과값을 반환해야 한다.', () => {
        expect(add(1000, 100)).toEqual(1100)
    })
})



describe('add function', () => {
    it.each([
        [0, 0, 0],
        [-1, 1, 0],
        [100, 0, 100],
        [1000, 100, 1100],
    ])(
        `%i, %i 을 더할 때 올바른 결과값을 반환해야 한다.`,
        (x, y, result) => {
            expect(add(x, y)).toEqual(result);
        }
    );
});


/*
(x, y, result) => {
    expect(add(x, y)).toEqual(result);
}

// 첫번째 Iteration
(0, 0, 0) => {
    expect(add(0, 0)).toEqual(0);
}

// 두번째 Iteration
(-1, 1, 0) => {
    expect(add(-1, 1)).toEqual(0);
}

// 세번째 Iteration
(100, 0, 100) => {
    expect(add(100, 0)).toEqual(100);
}

// 네번쨰 Iteration
(1000, 100, 1100) => {
    expect(add(1000, 100)).toEqual(1100);
}
*/


describe('add function', () => {
    it.each`
    x        | y        | result
    ${0}     | ${0}     | ${0}
    ${-1}    | ${1}     | ${0}
    ${100}   | ${0}     | ${100}
    ${1000}  | ${100}   | ${1100}
  `(
        `$x, $y 을 더할 때 올바른 결과값을 반환해야 한다.`,
        ({ x, y, result }) => {
            expect(add(x, y)).toEqual(result);
        }
    );
});