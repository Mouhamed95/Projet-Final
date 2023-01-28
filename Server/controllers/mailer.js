import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';


let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name : "Mailgen",
        link : 'https://mailgen.js/'
    }
})

export const registerMail = async (req, res) =>{
      const { username, userEmail, text, subject } = req.body;

       //body of email
       var email = {
           body : {
               name: username,
               intro : text || "Bienvenue aux cours quotidiens, nous sommes très heureux de vous avoir à bord",
               outro: "Besoin d'aide ou avez des questions? répondez simplement à cet e-mail, nous aimons vous aider"
           }  
       }
     
       var emailBody = MailGenerator.generate(email);

       let message = {
         from : ENV.EMAIL,
         to: userEmail,
         subject : subject || "Signup Successful",
         html : emailBody 
       }

       // send mail
       transporter.sendMail(message)
           .then(() => {
               return res.status(200).send({ msg: "vous devriez recevoir un e-mail de notre part"})
           })
           .catch(error => res.status(500).send({ error }))
}