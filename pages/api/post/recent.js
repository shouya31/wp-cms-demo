export default async (req, res) => {
  const api_url = "http://13.230.48.220/graphql"

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


  const data = await fetch( api_url, {
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