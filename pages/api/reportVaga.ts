export default async function handler(req, res) {
  try {
    const nodemailer = require("nodemailer");
    let htmlEmail = `
        <p><b>Vaga:</b> ${req.body.id || ""} - ${req.body.cargo || ""}</p>
        <p><b>Url:</b>${req.body.url || ""}</p>
        <p><b>Motivo:</b> ${req.body.motivo || ""}</p>
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
      to: "us.rodan@gmail.com", // list of receivers
      subject: `Report Vaga - ${req.body.id} - ${req.body.motivo} `, // Subject line
      //text: "Hello world?", // plain text body
      html: htmlEmail, // html body
    });

    return res.status(200).json(`OK`);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
