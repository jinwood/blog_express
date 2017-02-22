var fs = require('fs');
var metaMarked = require('meta-marked');

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
            a = new Date(a.meta.DateCreated);
            b = new Date(b.meta.DateCreated);
            return a>b ? -1 : a<b ? 1 : 0; //newest first
        });
        cb(res, posts);
    });
};

exports.getAllPosts = getAllPosts;