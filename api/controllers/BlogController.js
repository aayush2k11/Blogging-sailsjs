module.exports = {
  createBlog: function(req, res){
    console.log("BlogController.createBlog()");
    if(req.session && req.session.user ){
      console.log("User is there: "+req.session.user);
      User.find({email: req.session.user.email}).exec(function(err, user){
        if(!user){
          req.session.reset();
          res.redirect('/login');
        }else{
          res.locals.user=user[0];
          console.log(user[0].toJSON());
          res.view('user/makeBlog',{user: user[0]});
        }
      })
    }
    else{
      console.log("There is no user");
      res.redirect("/login");
    }
  },

  insertBlog: function(req, res){
    console.log("BlogController.insertBlog()");
    if(req.session && req.session.user && req.user){
      console.log("User is there "+req.user);
        var title = req.body.title,
            content = req.body.content,
            blogowner = req.user;
        Blog.create({
          'title': title,
          'content': content,
          'blogowner': blogowner
        }).exec(function(err, blog){
          if(err)
            console.log("Sorry error occured: "+err);
          else{
            console.log(blog);
            console.log(blog[0]+"\n"+blog[1]);
          }
          res.redirect('/dashboard');
        });
    }
    else{
      console.log("There is no one in session");
      res.redirect("/login");
    }
  },

  displayBlogs: function(req, res){
    console.log("BlogController.displayBlogs()");
    if(req.session && req.session.user && req.user){
      console.log("USer is there: ");
      console.log(req.user);
      Blog.find({}).exec(function(err, blogs){
        if(err){
          console.log("Sorry error occured");
          res.redirect("/logout");
        }
        if(!blogs)
          console.log("Sorry no blogs!");
        res.render("user/home",{user: req.user, blogs: blogs});
      });
    }
    else{
      console.log("Sorry no one is in session");
      res.redirect("/login");
    }
  },

  /**
  * @api {get} /blog/:id Blog unique ID
  * @api {version} 0.0.0
  * @apiName displayBlog
  * @apiGroup Blog
  * @apiDescription API displays the blog with <code>id</code> and displays blog owner name, comment, each comment's owner
  * @apiParam {Number} id Blog unique ID.
  * @apiHeader {String} blog-id Blog unique blog-id
  * @apiPermission Logged-In User
  * @apiSuccess {String} title Title of the blog.
  * @apiSuccess {String} blogowner User who wrote the blog
  * @apiSuccess {String} content Content of the blog
  * @apiSuccess {comments} Comments added to the blog
  *
  *
  * @apiError BlogNotFound The blog with <code>id</code> was not found.
  *
  * @apiExample {GET} Get Blog:
  *   GET http://10.0.1.2:1337/blog/12
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": "BlogNotFound"
  *     }
  */
  displayBlog: function(req, res){
    console.log("BlogController.displayBlog()");
    console.log("Id: "+req.params.id);
    if(req.session && req.session.user && req.user){
      Blog.findOne({id: req.params.id}).exec(function(err, blog){
        if(err){
          console.log("Sorry Error occurred");
          console.log(err);
          res.redirect("/home");
        }
        else if(!blog){
          console.log("Sorry! No such blog exist");
          res.redirect("/home");
        }
        else{
          //console.log(blog);
          var userId = blog.blogowner;
          User.findOne({id: userId}).exec(function(error, user){
            if(error){
              console.log("Sorry Error occurred");
              console.log(error);
              res.redirect("/home");
            }
            else{
              console.log("<<<<<<<User and blog both exist!>>>>>>>");
              // console.log(user);
              // console.log(blog);
              //console.log(req.user);
              Comment.find({owner: blog.id}).populate('commentowner').exec(function(err1, comments){
                if(err1){
                  console.log("Sorry Error occurred");
                  console.log(err1);
                  res.redirect("/home");
                }
                // var userNames={}
                // console.log("************************");
                // for (var i in comments){
                //   console.log(comments[i]);
                //   User.find({id: comments[i].commentowner}).exec(function(err, u){
                //     if(u){
                //       console.log(comments[i].commentowner);
                //       console.log(u);
                //       userNames[comments[i].commentowner] = u.username;
                //     }
                //   });
                // }
                // console.log(userNames);
                console.log(comments);
                res.render('blog/displayBlog',{user: user, blog: blog, comments: comments, currUser: req.user});
              });
            }
          });
        }
      });
    }
    else{
      console.log("Sorry! there is no one in the session");
      res.redirect("/login");
    }
  }
}