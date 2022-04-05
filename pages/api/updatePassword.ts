import axios from "axios";
import { MD5 } from "crypto-js";

export default async function updatePassword(req, res) {
  try {
    var data = JSON.stringify({
      password: req.body.password,
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
    } else {
      return res.status(200).json(`NÃO ATUALIZADA`);
    }
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
