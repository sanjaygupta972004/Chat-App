import Mailgen from "mailgen";
import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
         name: 'Chat-App',
         link: 'http://localhost:5000'
      }
   });

   const mailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
   const mailHTML = mailGenerator.generate(options.mailgenContent);


   const transporter = nodemailer.createTransport({
      host:process.env.MAILTRAP_SMPT_HOST ,
      port: process.env.MAILTRAP_SMPT_PORT,
      auth: {
         user: process.env.MAILTRAP_SMPT_USER,
         pass: process.env.MAILTRAP_SMPT_PASS
      }
   })

   const mail = {
      from :"Chat-App <" ,
      to: options.email,
      subject: options.subject,
      text: mailTextual,
      html: mailHTML
   }


   try {
      await transporter.sendMail(mail);
      
   } catch (error) {
      console.log("Error: email service failed to send email")
      console.error(error.message)
   }
}



const emailVerificationMailgenContent = (username, verificationUrl) => {
   return {
     body: {
       name: username,
       intro: "Welcome to our app! We're very excited to have you on board.",
       action: {
         instructions:
           "To verify your email please click on the following button:",
         button: {
           color: "#22BC66", // Optional action button color
           text: "Verify your email",
           link: verificationUrl,
         },
       },
       outro:
         "Need help, or have questions? Just reply to this email, we'd love to help.",
     },
   };
 };




 const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
   return {
     body: {
       name: username,
       intro: "We got a request to reset the password of our account",
       action: {
         instructions:
           "To reset your password click on the following button or link:",
         button: {
           color: "#22BC66", // Optional action button color
           text: "Reset password",
           link: passwordResetUrl,
         },
       },
       outro:
         "Need help, or have questions? Just reply to this email, we'd love to help.",
     },
   };
 };
 

export {sendEmail, emailVerificationMailgenContent, forgotPasswordMailgenContent}
