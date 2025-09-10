const nodemailer = require("nodemailer")

export default async function Mailer(email:string,OTP:string){
   const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mukultiwari9000@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

    const info = transport.sendMail({
        from: "Mailer <mukultiwari9000@gmail.com>",
        to: `Abhishek <${email}>`,
        envelop: {
            from: "mukultiwari9000@gmail.com",
            to: [
               email
            ]
        },
        subject: "Verify your email",
        text: `your one time password is: ${OTP}`,
    })

}

