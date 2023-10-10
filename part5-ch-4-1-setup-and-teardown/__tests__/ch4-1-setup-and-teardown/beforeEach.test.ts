import { unmountComponentAtNode } from "react-dom";

let container: any = null;
let a = 0
beforeEach(() => {
    // DOM 엘리먼트를 렌더링 대상으로 설정
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // 종료시 정리
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    a = 0
});

test("container test", () => {
    container.innerHTML = 'Hello World!'
    expect(document.body.children.length).toBe(1)
    expect(a).toBe(0)
})