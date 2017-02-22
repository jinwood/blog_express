var fs = require('fs');
var md = require('markdown-js');

function _readFiles(dirname, posts, onFileContent, onComplete){
    fs.readdir(dirname, function(err, fileNames){
        var count = fileNames.length;
        fileNames.forEach(function(fileName){
            fs.readFile(dirname + fileName, 'utf-8', function(err, content){
                posts.push(md.makeHtml(content));
                onFileContent(posts, count);
            });
        });
    });
}



var getAllPosts = function(res, cb){
    var posts = [];
    _readFiles('./posts/', posts, function(posts, count){
        if (posts.length === count)
            cb(res, posts);
    });
}

exports.getAllPosts = getAllPosts;