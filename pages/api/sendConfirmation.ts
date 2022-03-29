import client from "@/utils/apollo";
import { gql } from "@apollo/client";
import axios from "axios"
import { MD5 } from "crypto-js"

export default async function handler(req, res) {
    try {
      const nodemailer = require("nodemailer");
        const cod = MD5(Math.random)
        
        await axios.put(`https://maisvagases.herokuapp.com/api/users/${req.body.id}`,{codigo:cod})

      let htmlEmail = `
          <p><b>Email confirmação:</b> https://mural.maisvagases.com.br/validar?c=${cod}</p>
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
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Mural" <mural@maisvagases.com.br>', // sender address
        to: req.body.email, // list of receivers
        subject: `Report Vaga - ${req.body.id} - ${req.body.motivo} `, // Subject line
        //text: "Hello world?", // plain text body
        html: htmlEmail, // html body
      });
  
      return res.status(200).json(`OK`);
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  }
  