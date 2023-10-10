beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('test 1', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));

    test('test 2', () => console.log('2 - test'));
});







// 순서는 어떻게 될까요?
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

/**
 * 즉, 아래와 같은 scope에 쌓여서 동작이 수행된다고 이해하면 된다.
 * { // 1-beforeAll, 모든 scope의 테스트 동작 시작 전, 
 *      { // 1-beforeEach, root scope test 동작 전 
 *          // do test
 *      } // 1-afterEach, // root scope test 동작 전
 *      {
 *          // 2-beforeAll
 *          { // 1 beforeEach
 *              { // 2-beforeEach, root scope test 동작 전 
 *                  // do test
 *              } // 2-afterEach, // root scope test 동작 전  
 *          } // 1 afterEach
 *          // 2-afterAll
 *      }
 * } // 1-afterAll, 모든 scope의 테스트 동작 시작 전, 
 */

