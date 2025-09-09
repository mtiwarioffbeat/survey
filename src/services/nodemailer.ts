const nodemailer = require("nodemailer")

async function main(email:string){
    const transport = nodemailer.createTransport({
        sendmail:true,
    })

    const info = await transport.sendMail({
        from:"Mailer <mukultiwari9000@gmail.com>",
        to:"Abhishek <abhishekhzb2004@gmail.com>",
        envelop:{
            from:"mukultiwari9000@gmail.com",
            to:[
                "abhishekhzb2004@gmail.com"
            ]
        },
        subject:"Verify your email",
        text:"2435",

    })

    console.log("Envelope used:", info.envelope);
}

main("abhishekhzb2004@gmail.com").catch(console.error)