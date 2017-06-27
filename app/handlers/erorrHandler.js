var mail = require('./../mail');

var error  = function(err){
    var body = {
        name: 'website error',
        email: 'errors@julianinwood.co.uk',
        message: 'An error occured on the site - ' + err.message + '\n' + err.stack
    };

    mail.sendError(body);
};

exports.error = error;