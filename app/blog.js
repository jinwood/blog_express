var fs = require('fs');
var metaMarked = require('meta-marked');

function _stringToUkDate (dateString) {
    var split = dateString.split('/');
    if (split.length !== 3) {
        throw 'Invalid date input';
    }
    var month = split[1] - 1;
    return new Date(split[2], month, split[0]);
}

function _readFiles(dirname, posts, onFileContent, onComplete){
    fs.readdir(dirname, function(err, fileNames){
        var count = fileNames.length;
        fileNames.forEach(function(fileName){
            fs.readFile(dirname + fileName, 'utf-8', function(err, content){
                posts.push(metaMarked(content));
                if(posts.length === count) onFileContent(posts);
            });
        });
    });
}

var getAllPosts = function(res, cb){
    var posts = [];
    _readFiles('./posts/', posts, function(posts){
        posts = posts.sort(function(a,b){
            return _stringToUkDate(b.meta.DateCreated) - dateExtensions.stringToUkDate(a.meta.DateCreated);
        });
        cb(res, posts);
    });
};

exports.getAllPosts = getAllPosts;