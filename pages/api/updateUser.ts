import axios from "axios";
import { MD5 } from "crypto-js"

export default async function updateUser(req, res) {
  try {
    var data = JSON.stringify({ 
      username:req.body.username,
      empresa:req.body.empresa,
      nome:req.body.nome,
      email:req.body.email,
      imagem:req.body.imagem != 0 ? [Number(req.body.imagem)]: null,
      whatsapp:req.body.whatsapp
    }); 

    var update = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/${req.body.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    if(String(MD5("##@@$%&"+req.body.username+"##@@$%&"+req.body.id+"##@@$%&")) == req.body.hash){ 
     //@ts-ignore
     await axios(update);  
    return res.status(200).json(`Conta Atualizada`);
    }
    else{ 
      return res.status(200).json(`NÃO ATUALIZADA`);
    }

  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
