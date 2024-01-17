const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const Users = require('../models/users');
const Forgotpassword = require('../models/forgotpass');

exports.forgotpassoword = async (req, res, next) => {
    try {
        const email = req.body.email;

        const users = await Users.findAll({ where: { email: email } });
        // if user not found
        if (!users.length) {
            throw new Error('User not found');
        }
        const user = users[0];

        const newUUID = uuidv4();
        const response = await user.createForgotpassword({
            uuid: newUUID,
            isActive: 'true'
        });

        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'crypto.king.1@outlook.com',
                pass: process.env.OUTLOOK_PASS
            }
        });

        const mailOptions = {
            from: 'crypto.king.1@outlook.com',
            to: email,
            subject: 'Password Reset Link',
            text: `Here is your password rest link - file:///C:/Users/Abhishek/Desktop/js-basics/expressStudy/projects/expenseTrackerApp/frontend/resetPassword.html?id=${newUUID}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Reset Email Sent: Check Your Email Inbox' });
            }
        });

    }
    catch (err) {
        console.log('err: ', err);
    }
}


exports.changePass = async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        console.log(uuid);
        const response = await Forgotpassword.findAll({ where: { uuid: uuid } });
        if (response.length > 0) {
            const newPassoword = req.body.password;

            response[0].isActive = 'false';
            const result = await response[0].save();

            const user = await response[0].getUser();
            console.log(user.password);

            const saltRounds = 10;
            bcrypt.hash(newPassoword, saltRounds, async (err, hash) => {
                user.password = hash;
                const newRes = await user.save();

                res.status(200).json({ uuid: uuid });
            })
        } else {
            res.status(200).json({ message: 'Reset link is expired' });
        }
    }
    catch (err) {
        console.log(err);
    }
};




/*var SibApiV3Sdk = require('sib-api-v3-sdk');

exports.forgotpassoword = (req, res, next) => {
    console.log(1245);

    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
        email: 'avipal577@gmail.com'
    }

    const reciver = [
        {
            email: 'contact.abhishek.paul@gmail.com',
        },
    ];

    apiInstance.sendTransacEmail({
        sender,
        to: reciver,
        subject: 'Test subject',
        textContent: 'Test Text Content....'
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
}*/



/*const brevo = require('@getbrevo/brevo');

exports.forgotpassoword = (req, res, next) => {
    console.log(1245);
    let client = new brevo.TransactionalEmailsApi();

    const apiKey = client.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = { "name": "Abhishek Paul", "email": "avipal577@gmail.com" };
    sendSmtpEmail.to = [{ "email": "vast6r@gmail.com", "name": "Jane Doe" }];

    client.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));

    }, function (error) {
        console.error('Error:', error);
    });
};*/
