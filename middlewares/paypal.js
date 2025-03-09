const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox',  
    'client_id': process.env.PAYPALID ,
    'client_secret': process.env.PAYPALSECRET
});

module.exports = paypal;