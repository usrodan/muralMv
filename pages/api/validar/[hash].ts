import axios from "axios";
export default async function validar(req, res) {
  try {
    var data = JSON.stringify({
      ativo: true,
    });

    var userData = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/?filters[codigo][$eq]=${req.query.hash}`,
      headers: {
        "Content-Type": "application/json",
      } 
    };
    //@ts-ignore
    var user = await axios(userData);

    var update = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/${user.data[0].id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
     //@ts-ignore
    await axios(update);  

    return res.status(200).json(`Conta ativada com sucesso`);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
