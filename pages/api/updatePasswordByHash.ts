import axios from "axios";

export default async function handler(req, res) {
  try {
     var userData = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/?filters[codigo][$eq]=${req.body.hash}`,
      headers: {
        "Content-Type": "application/json",
      } 
    };
    //@ts-ignore
    var user = await axios(userData);   
    var updateUserPassword = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/${user.data[0].id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        password:req.body.password
      }
    };
   //@ts-ignore
    var update = await axios(updateUserPassword); 

    return res.status(200).json(update.data);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
