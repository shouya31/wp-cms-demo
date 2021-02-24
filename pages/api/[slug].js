export default async (req, res) => {
  const api_url = "http://13.230.48.220/graphql"
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
    api_url,
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