import Head from 'next/head'

import { TodoCreate } from '@/components/TodoCreate'
import { TodoList } from '@/components/TodoList'

export default function Home() {
  return (
    <div>
      <Head>
        <title>ToDo List</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css' rel='stylesheet' type='text/css' />
      </Head>

      <main>
        <h1>
          해야 할 업무를 등록해 주세요
        </h1>
        <TodoCreate />
        <h1>
          해야할 일 목록
        </h1>
        <TodoList />
      </main>
    </div>
  )
}
