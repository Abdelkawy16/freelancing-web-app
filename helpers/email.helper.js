const nodemailer = require("nodemailer")

const smtpConfig = {
    service: 'yahoo',
    auth: {
        user: "mustafa_abdelkawy16@yahoo.com",
        pass: "ngdmdgwubhmlcxvn"
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