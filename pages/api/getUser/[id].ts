import axios from "axios";
import { MD5 } from "crypto-js";

export default async function handler(req, res) {
  try {
     var userData = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/${req.query.id}`,
      headers: {
        "Content-Type": "application/json",
      } 
    };
    //@ts-ignore
    var user = await axios(userData); 

    return res.status(200).json(user.data);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
