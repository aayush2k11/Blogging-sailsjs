/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  '/':{
    view: 'homepage'
  },

  'get /index': {
    view: 'user/index'
  },


  'post /signup':{
    controller: 'AuthController',
    action: 'create'
  },

  'get /dashboard':{
    controller: 'UserController',
    action: 'dashboard'
  },

  'get /users/createBlog':{
    controller: 'BlogController',
    action: 'createBlog'
  },

  '/logout': {
    controller: 'AuthController',
    action: 'logout'
  },
  'post /login': {
    controller: 'AuthController',
    action: 'login'
  },

  'post /users/createBlog': {
    controller: 'BlogController',
    action: 'insertBlog'
  },

'get /login': 'AuthController.login',
'get /logout': 'AuthController.logout',
'get /register': 'AuthController.register',
'post /auth/local': 'AuthController.callback',
'post /auth/local/:action': 'AuthController.callback',
  'get /home': {
    controller: 'BlogController',
    action: 'displayBlogs'
  },

  'get /blog/:id': {
    controller: 'BlogController',
    action: 'displayBlog'
  },

  'post /blog/addcomment/:id':{
    controller: 'CommentController',
    action: 'createComment'
  },

  'get /comment/delete/:id':{
    controller: 'CommentController',
    action: 'destroyComment'
  },

  'get /comment/edit/:id':{
    controller: 'CommentController',
    action: 'editComment'
  },

  'post /comment/update/:id':{
    controller: 'CommentController',
    action: 'updateComment'
  }
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
