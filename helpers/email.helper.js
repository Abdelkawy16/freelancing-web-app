const nodemailer = require("nodemailer")

const smtpConfig = {
    service: 'gmail',
    auth: {
        user: "m.abdelkawy16@gmail.com",
        pass: "test12345"
    }
}

const sendEmailCustom = (reciver, emailTxt, subject) => {
    try {
        const transporater = nodemailer.createTransport(smtpConfig)
        let emailOptions = {
            from: "freelancing",
            to: reciver,
            subject: subject,
            html: emailTxt
        }
        transporater.sendMail(emailOptions)
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = sendEmailCustom