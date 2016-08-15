module.exports={
  /**
  * @api {post} /blog/addcomment/:id Post a comment on Blog
  * @api {version} 0.0.0
  * @apiName CreateComment
  * @apiGroup Comment
  *
  * @apiParam {Number} id Blog unique ID.
  *
  * @apiSuccess {String} content Content of the Comment.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "Content": "John",
  *       "lastname": "Doe"
  *     }
  *
  * @apiError BlogNotFound The <code>id</code> of the blog was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": "BlogNotFound"
  *     }
  */
  createComment: function(req, res){
    console.log("CommentController.createComment()");
    if(req.session && req.session.user && req.user){
      // console.log("********** INSIDE CREATECOMMENT ********");
      // console.log(req.body);
      // console.log(req.user);
      // console.log(req.params.id);
      var blogId = req.params.id;
      var userId = req.user.id;
      var content = req.body.comment;
      var commentOwner = req.user;
      User.find({id: userId}).exec(function(err, user){
        if(err){
          console.log("Sorry! error occured");
          console.log(err);
          res.redirect("/home");
        }
        if(!user){
          console.log("Sorry! You are not allowed to write a comment");
          res.redirect("/home");
        }
        Blog.find({id: blogId}).exec(function(error, blog){
          if(err){
            console.log("Sorry! error occured");
            console.log(err);
            res.redirect("/home");
          }
          if(!blog){
            console.log("Sorry! Blog does not exist");
            res.redirect("/home");
          }
          // console.log("<<<<<User and Blog exists!>>>>>");
          // console.log(blog);
          Comment.create({
            'content': content,
            'commentowner': commentOwner.id,
            'owner': blogId
          }).exec(function(err1, comment){
            if(err1){
              console.log("Sorry! error occured");
              console.log(err1);
              res.redirect("/home");
            }
            if(!comment){
              console.log("Sorry! Was not able to create the comment");
              res.redirect("/home");
            }
            // console.log("<========= Comment Created =========>");
            // console.log(comment);
            // console.log(blog);
            // console.log(user);
            res.redirect('/blog/'+blog[0].id);
          });
        });
      });
    }
    else{
      console.log("Sorry! Login in to add comment to the blog");
      res.redirect('/login');
    }
  },

  destroyComment: function(req, res){
    console.log("CommentController.destroyComment()");
    if(req.session && req.session.user && req.user){
      var commentID = req.params.id;
      Comment.destroy({id: commentID}).exec(function(err, comment){
        if(err)
          return res.serverError();
        else{
          // console.log(comment);
          // console.log(comment[0].owner);
          var blogID = comment[0].owner;
          res.redirect('/blog/'+blogID);
        }
      });
    }
    else{
      console.log("Sorry no one in sessions");
      res.redirect('/login');
    }
  },

  editComment: function(req, res){
    console.log("CommentController.editComment");
    if(req.session && req.session.user && req.user){
      var commentID = req.params.id;
      Comment.findOne({id: commentID})
      .populate('commentowner')
      .populate('owner')
      .exec(function(err, comment){
        console.log("^^^^^^^^^============^^^^^^^^^");
        console.log(comment);
        var blogID = comment.owner.id;
        Blog.findOne({id: blogID}).populate('blogowner').exec(function(err1, blog){
          if(err1){
            console.log(err1);
            res.redirect('/home');
          }
          res.render('blog/editComment', {comment: comment, blog: blog});
        });
        // res.redirect('/index');
      });
    }
    else{
      console.log("Sorry no one in session");
      res.redirect('/login');
    }
  },

  updateComment: function(req, res){
    console.log("CommentController.updateComment()");
    if(req.session && req.session.user && req.user){
      var commentID = req.params.id;
      var content = req.body.comment;
      console.log("CommentID: "+commentID+" content: "+content);
      Comment.findOne({id: commentID}).exec(function(err, updated){
        if(err){
          console.log(err);
          res.redirect('/home');
        }
        else{
          updated.content = content;
          console.log(updated);
          updated.save(function(error){
            if(error){
              console.log(error);
              res.redirect('/home');
            }
            else{
              console.log("-_-_-_-_-");
              console.log(updated);
              var blogID = updated.owner;
              res.redirect('/blog/'+blogID);
            }
          });
        }
      });
    }
    else{
      console.log("Sorry no one in session");
      res.redirect('/login');
    }
  }
}