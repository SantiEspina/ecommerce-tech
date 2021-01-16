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

function orderEmail (obj) {
    let { email, username, order, total, adress } = obj;

    let modelEmail = fs.readFileSync("./src/mailModel/confirmPurchase.html", 'utf-8', function(err, data) {
        if(err) console.log('error fs', err);
        return data;
    });

    modelEmail = modelEmail.replace("%username%", username);
    modelEmail = modelEmail.replace("%orderTotal%", total);
    modelEmail = modelEmail.replace("%adress%", adress);
    modelEmail = modelEmail.replace("%orderId%", `<p style="font-size: 1.5rem;color: rgb(255, 104, 104);width: 10rem;background-color: #fff;">${order.id}</p>`)
    modelEmail = modelEmail.replace("%orderLink%", `<a href="http://localhost:3000/order/${order.id}" style="color: rgb(255, 104, 104);font-size: 1.5rem;">Link</a>`)

    nodemailerMailgun.sendMail({
        from: 'ecommerceTech@tech.com',
        to: email,
        subject: 'Confirm Purchase',
        html: modelEmail
    }, function(err, info) {
        if(err) console.log('error', err);
        else console.log('info', info)
    });

    return modelEmail;
};

module.exports = {
    orderEmail
}