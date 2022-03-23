import client from "@/utils/apollo";
import { gql } from "@apollo/client";

export default async function handler(req, res) {
  try {
    const { imageHash } = require("image-hash"); 

     imageHash(req.body.img.url, 16, true, async (error, data) => {
      if (error) throw error; 

      const response = await client.query({
        query: gql` 
          query {
            murals(filters:{hash:{eq:"${data}"}}) {
              data {
                id  
              }
            }
          }
        `,
      });

      console.log("----RESPONSE-----")
      console.log(response.data)
      console.log("----HASH-----")
      console.log(data)

      if(!response.data.murals.data.length ){
        return res.status(200).send(data);  
      }
      return res.status(200).json({ error: "Já existe essa imagem em nosso banco de dados"  });

    });  

    //return res.status(400).json({ error: "Já existe essa imagem em nosso banco de dados"  });  
 

    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
