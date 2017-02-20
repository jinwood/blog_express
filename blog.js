var fs = require('fs');

var getAllPosts = function(){
    var content = JSON.parse(fs.readFileSync('./blogposts.json', 'utf8'));
    return content.posts;
};

exports.getAllPosts = getAllPosts;