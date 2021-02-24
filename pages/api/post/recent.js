export default async (req, res) => {

  const QUERY_RECENT_POSTS = `
  query RecentPosts() {
    posts(first: 5, where: {orderby: {field: DATE, order: DESC } }) {
      edges {
        node {
          slug
          title
          excerpt
        }
      }
    }
  }
`;


  const data = await fetch( process.env.WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: QUERY_RECENT_POSTS,
      })
    }
  );

  const json = await data.json()
  res.json(json.data)

}