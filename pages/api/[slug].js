export default async (req, res) => {
  const { query: {slug} } = req;

  const QUERY_SINGLE_POST = `
  query SinglePost($id: ID!) {
    page(id: $id, idType: URI) {
      title
      content
    }
  }
  `;

  const data = await fetch(
    process.env.WORDPRESS_API_URL,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        query: QUERY_SINGLE_POST,
        variables: {
          id: slug
        }

      })
    }
  );

  const json = await data.json()

  res.json(json.data)
}