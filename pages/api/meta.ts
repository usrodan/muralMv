import client from "@/utils/apollo";
import { gql } from "@apollo/client";

export default async function meta(req, res) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=500, stale-while-revalidate=600"
  );
  const { data } = await client.query({
    query: gql`
      query {
        cidades(sort: "cidade:asc", pagination: { limit: 1000 }) {
          data {
            id
            attributes {
              cidade
              slug
              murais {
                data {
                  id
                }
              }
            }
          }
        }
        tipos(sort: "tipo:asc") {
          data {
            id
            attributes {
              slug
              tipo
            }
          }
        }
      }
    `,
  });
  res.status(200).json(data);
}
