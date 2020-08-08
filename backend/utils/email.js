const nodemailer = require('nodemailer');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.user_email.split(' ')[0];
        this.firstName = user.user_name;
        this.url = url;
        this.from = `Sravanth Chebrolu <${process.env.EMAIL_USERNAME}>`;
    }

    newTransport() {
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(message, subject) {

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: message
        };

        await this.newTransport().sendMail(mailOptions);
    }

    async sendHello() {
        await this.send(`Hello ${this.firstName}! We are so happy to have you on board! Hope you have a great experience!`, "Welcome to LFT!");
    }

    async sendPasswordReset() {
        await this.send(
            `We have recieved a password reset request from you. Your password reset token is ${this.url}. The token is only valid for 10 minutes.
            
            You can safely ignore this message if you did not request a passowrd reset.`,
            'LFT Password Reset'
        );
    }
};
