var fs = require('fs');
var metaMarked = require('meta-marked');
var dateExtensions = require('./extensions/date.js');

function _readFiles(dirname, posts, onFileContent, onComplete){
    fs.readdir(dirname, function(err, fileNames){
        var count = fileNames.length;
        fileNames.forEach(function(fileName){
            fs.readFile(dirname + fileName, 'utf-8', function(err, content){
                posts.push(metaMarked(content));
                if(posts.length === count)
                    onFileContent(posts);
            });
        });
    });
}

var getAllPosts = function(res, cb){
    var posts = [];
    _readFiles('./posts/', posts, function(posts){
        posts = posts.sort(function(a,b){
            return dateExtensions.stringToUkDate(b.meta.DateCreated) - dateExtensions.stringToUkDate(a.meta.DateCreated);
        });
        cb(res, posts);
    });
};

exports.getAllPosts = getAllPosts;