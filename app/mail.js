var nodemailer = require('nodemailer');
var fs = require('fs');
var logger = require('./logger');

var sendMail  = function(body){
    var mailOpts, smtpTrans, credentials;

    credentials = JSON.parse(fs.readFileSync('./privateSettings.json', 'utf8'));

    smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: credentials.mailSettings.email,
            pass: credentials.mailSettings.password
        }
    });

    mailOpts = {
        from: body.name + ' &lt;' + body.email + '&gt;',
        to: credentials.mailSettings.email,
        subject: 'Website contact form',
        text: body.message
    };

    smtpTrans.sendMail(mailOpts, function(error, response){
        logger.warn('Error occured sending mail with content to'
                    + mailOpts.to + ' with content - ' +
                    + mailOpts.text + ' Error >>> ' + error);
    });
};

var sendError = function(body){
    //repeated code sucks... Fix!
    var mailOpts, smtpTrans, credentials;

    credentials = JSON.parse(fs.readFileSync('./privateSettings.json', 'utf8'));

    smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: credentials.mailSettings.email,
            pass: credentials.mailSettings.password
        }
    });

    mailOpts = {
        from: body.name + ' &lt;' + body.email + '&gt;',
        to: credentials.mailSettings.email,
        subject: 'Website error!',
        text: body.message
    };

    smtpTrans.sendMail(mailOpts, function(error, response){
        logger.warn('Error occured sending error mail with content to'
                    + mailOpts.to + ' with content - ' +
                    + mailOpts.text + ' Error >>> ' + error);
    });
}

exports.sendMail = sendMail;
exports.sendError = sendError;