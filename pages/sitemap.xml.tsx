import client from '@/utils/apollo'
import { gql } from "@apollo/client"; 
import slugify from '@/utils/slugify';

const toUrl = (host, route) =>
  `<url><loc>https://mural.maisvagases.com.br/${route}</loc></url>`;

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route)).join("")}
    </urlset>`;

const Sitemap = () => {};
Sitemap.getInitialProps = async ({ res, req }) => {
  const { data } = await client.query({
    query: gql` 
    query {
      murals(pagination:{limit:99999}, sort: ["createdAt:desc"]) {
        data {
          id 
          attributes {
            cargo
          }
        }
      }
    }
  `,
  });
  var urls = []
  const r = (Object.values(data.murals.data))
  //@ts-ignore
  r.map(rr=> urls.push(`${rr.id}-${slugify(rr.attributes.cargo)}`)) 

  const sitemap = createSitemap(req.headers.host, urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;