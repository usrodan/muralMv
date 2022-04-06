import client from "@/utils/apollo";
import { gql } from "@apollo/client";

export default async function getUser(req, res) {
  try {
    const response = await client.query({
      query: gql` 
      query {
        usersPermissionsUsers(filters: { id: { eq: ${req.query.id} } }) {
          data {
            attributes {
              username
              imagem {          
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              nome
              email
              empresa
              whatsapp
              cnpj
              confirmed
              blocked
              ativo
            }
          }
        }
      }
      `,
    });
    const d = response.data.usersPermissionsUsers.data[0].attributes
    const r = {
      id: req.query.id,
      username: d.username,
      email: d.email, 
      confirmed: d.confirmed,
      blocked: d.blocked, 
      nome: d.nome,
      cnpj: d.cnpj,
      whatsapp:d.whatsapp,
      empresa:d.empresa,
      ativo: d.ativo,
      imagem:{
        id: d.imagem.data ? d.imagem.data.id : 0,
        url: d.imagem.data ? d.imagem.data.attributes.url : "",
      }
    };
    return res.status(200).json(r);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
