var jade = require('jade');
var mail = require('./mail');
var blog = require('./blog');

module.exports = function(app){

    //web
    app.get('/', function(req, res, next){ 
        try{
            var template = jade.compileFile(__dirname + '/source/templates/homepage.jade');
            var html = template({title:'Home'});
            res.send(html);
        }catch(e){
            next(e);
        }
    });

    app.get('/blog', function(req, res, next){
        try{
            var posts = blog.getAllPosts();
            var template = jade.compileFile(__dirname + '/source/templates/blog.jade');            
            var html = template({title:'Blog', posts: posts});
            res.send(html);
        }catch(e){
            next(e);
        }
    });

    app.get('/contact', function(req, res, next){
        try{
            var template = jade.compileFile(__dirname + '/source/templates/contact.jade');            
            var html = template({title:'Contact'});
            res.send(html);
        }catch(e){
            next(e);
        }
    });

    app.post('/contact', function(req, res, next){
        var template = jade.compileFile(__dirname + '/source/templates/contact.jade');     
        mail.sendMail(req.body);
        res.send(template({title: 'Contact', msg: 'Message sent!'}));
    });


    //api
    app.get('/api/cv/json', function(req, res, next){
        try{
            res.json({name: 'Julian', document: 'CV'});
        }catch(e){
            next(e);
        }
    });

};