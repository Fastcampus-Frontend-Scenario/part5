import TodoProvider from 'context/todoContext'
import type { AppProps } from 'next/app'
import '../styles/styles.css';
import '../styles/switch.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider value={[]}>
      <Component {...pageProps} />
    </TodoProvider>
  )
}
