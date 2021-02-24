import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Page() {

  const router = useRouter();
  const { query : { slug } } = router;
  const { data, error } = useSWR(`/api/${slug}`, fetcher);

  if(error) return <div>error...</div>
  if(!data) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{data.page.title}</h1>
        <div dangerouslySetInnerHTML={{__html: data.page.content}} />
      </main>
    </div>
  )
}

