import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR(`/api/sample-page`, fetcher);

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

export async function getStaticProps({ params }) {
  console.log(params)

  return{
    props: {
      slug: params.slug,
    }
  }
}

export async function getStaticPaths() {
  const QUERY_ALL_PAGES = `
    query AllPages() {
      pages {
        edges {
          node {
            uri
          }
        }
      }
    }
  `;


  const allPages = await fetch( process.env.WORDPRESS_API_URL, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      query: QUERY_ALL_PAGES,
    })
  });

  const json = await allPages.json()

  console.log(json)

  return{
    allPages,
    fallback :true
  }
}