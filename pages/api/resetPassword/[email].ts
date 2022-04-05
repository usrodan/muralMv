import axios from "axios";
import { MD5 } from "crypto-js";

export default async function resetPassword(req, res) {
  try {
    const nodemailer = require("nodemailer");
    var cod = await MD5(String(new Date()));
    var data = JSON.stringify({
      codigo: String(cod),
    });  

    var getuserId = await axios.get( `${process.env.NEXT_PUBLIC_STRAPI}/api/users/?filters[email][$eq]=${req.query.email}`);
    var userId = getuserId.data[0].id 

    var config = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
     //@ts-ignore
    var user = await axios(config);
    let htmlEmail = `
          <p> Olá ${user.data.nome},<br/>
          Esqueceu a senha? Não se preocupe,<br/>
          abaixo está um link para recuperar sua senha: <br/>
          https://mural.maisvagases.com.br/alterar-senha/${cod}</p>
          <br/>
          Caso não tenha solicitado alteração de senha,<br/>
          por favor ignore esse email.<br/><br/>

          <p>Enviado através de https://mural.vaisvagases.com.br</p>
          `;

    let transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_SERVER,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    }); 

     await transporter.sendMail({
      from: '"Mais Vagas ES" <smtp@maisvagases.com.br>', // sender address
      to: user.data.email, // list of receivers
      subject: `Recuperar Senha - Mais Vagas ES `, // Subject line
      //text: "Hello world?", // plain text body
      html: htmlEmail, // html body
    });

    return res.status(200).json(`OK`);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
