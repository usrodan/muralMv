import axios from "axios";
import { MD5 } from "crypto-js";

export default async function sendConfirmation(req, res) {
  try {
    const nodemailer = require("nodemailer");
    var cod = await MD5(String(new Date()));
    var data = JSON.stringify({
      codigo: String(cod),
    });

    var config = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_STRAPI}/api/users/${req.query.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
     //@ts-ignore
    var user = await axios(config);
    let htmlEmail = `
          <p> Olá ${user.data.nome},<br/>
          Confirme o seu cadastro clicando no link abaixo:<br/>
          https://mural.maisvagases.com.br/validar/${cod}</p>
          <br/>
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
      subject: `Confirmar e-mail - Mais Vagas ES `, // Subject line
      //text: "Hello world?", // plain text body
      html: htmlEmail, // html body
    });

    return res.status(200).json(`OK`);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
