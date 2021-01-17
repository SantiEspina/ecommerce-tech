const fs = require('fs');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const jwt = require('jsonwebtoken');

const {
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    SECRETO
} = process.env;

const auth = {
    auth: {
        api_key: MAILGUN_API_KEY,
        domain: MAILGUN_DOMAIN
    }
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));


function passwordEmail(obj) {
    let { id, email, username } = obj;
    const token = jwt.sign({ id, email }, SECRETO);

    let modelEmail = fs.readFileSync("./src/mailModel/password.html", 'utf-8', function(err, data) {
        if(err) console.log('error fs', err);
        return data;
    });
    // http://localhost:3000/resetPassword?token=token
    modelEmail = modelEmail.replace("%username%", username);
    modelEmail = modelEmail.replace("%resetLink%", `<a href="https://ecommerce-ft07-g02.vercel.app/resetPassword?token=${token}" style="font-size: 1.5rem;color: rgb(255, 104, 104); cursor: pointer;">Link</a>`)
    modelEmail = modelEmail.replace("%resetLink%", `<span style="color: rgb(255, 104, 104);">"ecommerce-ft07-g02.vercel.app/resetPassword?token=${token}"</span>`)

    nodemailerMailgun.sendMail({
        from: 'ecommerceTech@tech.com',
        to: email,
        subject: 'Restore Password',
        html: modelEmail
    }, function(err, info) {
        if(err) console.log('error', err);
        else console.log('info', info)
    });

    return modelEmail;
};

module.exports = {
    passwordEmail
}