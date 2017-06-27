var winston = require('winston');
var path = require('path');
var fs = require('fs');

function _innit(){
    fs.exists('./log.log', function(exists){
        if(!exists){
            fs.writeFile('./log.log', '', function(err){
                if(err){
                    //do something that isn't loggings
                }
            });
        }
    });
}

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: './log.log'})
    ],
    exceptionHandlers:[
        new winston.transports.File({filename: './log.log'})
    ]
}, _innit());

module.exports = logger;
