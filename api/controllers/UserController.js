/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  view: function(req, res){
    var id=req.params.id;
    console.log('UserController.view() '+id);
    User.findOne({id:id}).populate('addresses').exec(function callback(err, user){
      if(err)
        console.log('Did not find a user with id: '+id);
      else{
        console.log(user.toJSON());
        res.view('user/view',{user: user});
      }
    });
  },

  edit: function(req, res){
    var id = req.params.id;
    console.log('UserController.edit() '+id);
    User.findOne({id: id}).exec(function callback(err, user){
      if(err)
        console.log('Sorry! User with '+id+' does not exist!');
      else
        res.view('user/edit',{user: user});
    });
  },

  update: function(req, res){
    // var id= req.params.id;
    // User.findOne({id: id}).exec(function callback(err, user){
    //   User.update(req.body).exec(function(err, user){
    //     if(err)
    //       console.log('Was not able to update user details');
    //     else
    //       res.redirect('/users/show/id');
    //   });
    // });
    console.log("Request Method: "+req.method);
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var id = params.id;
    console.log('UserConroller.update() '+id);
    if (!id) return res.send("No id specified.",500);
    User.update(id, params, function userUpdated(err, updatedUser) {
      if (err) {
        res.redirect('/users/edit/'+id);
      }
      if(!updatedUser) {
        res.redirect('/users/edit/'+id);
      }
      res.redirect('/users/show/'+id);
    });
  },

  dashboard: function(req, res){
    console.log("UserConroller.dashboard()");
    if(req.session && req.session.user){
      console.log("User Details: "+req.session.user);
      User.find({ email: req.session.user.email}).exec(function(err, user){
        if(!user){
          req.session.reset();
          res.redirect('/login');
        }else{
          res.locals.user=user[0];
          console.log(user[0].toJSON());
          Blog.find({blogowner: user[0].id}).exec(function(err, blogs){
            if(!blogs)
              console.log("No blogs published by the user");
            else{
              console.log("Blogs are: "+blogs);
            }
            res.render('user/dashboard',{user: user[0], blogs: blogs});
          })
        }
      });
    }
    else{
      console.log("No one is there in sessions!");
      res.redirect("/index");
    }
  },

  destroy: function(req, res){
    var id = req.param('id');
    if(!id)
      return res.send("No ID specified!", 500);
    console.log("USerController.destroy()"+id);
    User.find({id: id}).exec(function foundUser(err, user){
      if(err)
        return res.send(err,500);
      if(!user)
        return res.send("No user with this id exists!", 404);
      User.destroy({id: id}).exec(function destroyUser(err){
        if(err)
          return res.send(err, 500);
        return res.redirect('/users/index');
      });
    });
  },
};

