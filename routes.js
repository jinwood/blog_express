var jade = require('jade');
var mail = require('./mail');
var blog = require('./blog');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

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

    app.get('/resume', function(req, res, next){
        try{
            var template = jade.compileFile(__dirname + '/source/templates/resume.jade');
            var html = template({title:'My Resume'});
            res.send(html);
        }catch(e){
            next(e);
        }
    });

    app.get('/blog', function(req, res, next){
        try{
            blog.getAllPosts(res,function(res, posts){
                var template = jade.compileFile(__dirname + '/source/templates/blog.jade');            
                var html = template({title:'Blog', posts: posts});
                res.send(html);
            });
            
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
    app.get('/api/resume/json', function(req, res, next){
        try{
            fs.readFile('./privateSettings.json', 'utf8', function(err, data){
                res.json(JSON.parse(data).cv);
            });
        }catch(e){
            next(e);
        }
    });
    
    app.get('/api/resume/pdf', function(req, res, next){
        try{
            var file = __dirname + '/static/pdfs/JulianInwoodResume.pdf';

            var filename = path.basename(file);
            var mimetype = mime.lookup(file);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        }catch(e){
            next(e);
        }
    });


    // Handle 404
    app.use(function(req, res) {
        try{
            var template = jade.compileFile(__dirname + '/source/templates/404.jade');
            var html = template({title:'404: Something\'s missing...'});
            res.send(html, 404);
        }catch(e){

        }
    });
    
    // Handle 500
    app.use(function(error, req, res, next) {
        try{
            var template = jade.compileFile(__dirname + '/source/templates/500.jade');
            var html = template({title:'500: You blew it up!!'});
            res.send(html, 404);
        }catch(e){

        }
    });

};