import Head from 'next/head'
import '../styles/index.css'

type MyHead = () => JSX.Element

const MyHead: MyHead = () => (
  <React.Fragment>
    <Head>
      <title>To Do List</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css" />
      <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    </Head>
  </React.Fragment>
)

export default MyHead
