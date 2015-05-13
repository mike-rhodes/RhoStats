// Load dependencies
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var csrfProtection = csrf({ cookie: true });

module.exports = function(router, passport) {

  //========= Home page
  router.get('/', function(req,res) {

    // Set cookies
    // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
    // Render view
    res.render('index.ejs', {title: 'RhoStats | A Blog About Everything Statistics and Programming',
      categories: [{menu_name: 'Sports', link: 'sports'}, {menu_name: 'Politics', link: 'politics'}, {menu_name: 'Economy', link: 'economy'}, {menu_name: 'Business', link: 'business'}]});
  });

  //========= Error
  router.get('/error', function(req,res) {

    res.render('error.ejs');

  });

  //========= Admin
  router.get('/admin/', isLoggedInAndAdmin, function(req, res) {

    // console.log(req.isLoggedInAndAdmin());
    // console.log(req.user);
    res.render('admin/admin.ejs');

  });

  //========= Post
  router.get('/about', function(req,res) {

    res.render('about_me.ejs', {title: 'RhoStats | A Blog About Everything Statistics and Programming'});

  });

  //========= Post
  router.get('/post', function(req,res) {

    res.render('post.ejs',{title: 'RhoStats | A Blog About Everything Statistics and Programming',
      categories: [{menu_name: 'Sports', link: 'sports'}, {menu_name: 'Politics', link: 'politics'}, {menu_name: 'Economy', link: 'economy'}, {menu_name: 'Business', link: 'business'}],
      post_content: [{content: 'Hello world', content_type: 'p'}]});

  });

  //========= Login
  router.get('/login', function (req, res) {

    res.render('login.ejs', {message: req.flash('loginMessage')});

  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  //========= Signup - turned off for now since we dont want people signing up
  router.get('/signup', function (req, res) {

    res.render('signup.ejs', {message: req.flash('signupMessage')});

  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  //========= Profile
  router.get('/profile', isLoggedIn, function (req, res) {

    res.render('profile.ejs', {
      user: req.user
    });

  });

  //========= Logout
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// route middleware to make sure a user is logged in
function isLoggedInAndAdmin(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.local.isAdmin === true)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');

}
