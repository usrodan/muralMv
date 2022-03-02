

export default async function handler(req, res) {
    try {
        const nodemailer = require("nodemailer"); 
        let htmlEmail = `
        <p><b>Nome:</b> ${req.body.nome || ""}</p>
        <p><b>Tel:</b> ${req.body.tel || ""}</p>
        <p><b>Email:</b> ${req.body.email || ""}</p>
        <p><b>Mensagem:</b> ${req.body.mensagem || ""}</p>
        <br/>
        <p>Enviado através de www.csrmudancas.pt</p>
        `;
        
      
          let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user:"geral@csrmudancas.pt", 
              pass: "HgLBmVD2nfvczGY6", 
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: `"${req.body.nome}" <info@csrmudancas.pt>`, // sender address
            to: "geral@csrmudancas.pt", // list of receivers
            subject: `Contato CSR Mudanças - ${req.body.nome} `, // Subject line
            //text: "Hello world?", // plain text body
            html: htmlEmail, // html body
            replyTo: req.body.email
          }); 
     
    return res.status(200).json(`OK`);
} catch (error) {
    return res.status(200).json({ error: error.message });
}
}