var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var moment = require('moment');


// MONGOOSE CONNECT //

var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://alhnr:alexis95@ds235053.mlab.com:35053/shareandgo',
    options,
    function(err) {
     console.log(err);
    }
);

// MONGOOSE SCHEMA //

var commentaireSchema = mongoose.Schema({
  commentaire: String,
  username: String,
  date:String
 });


var activitySchema = mongoose.Schema({
    activityName: String,
    activityTheme: String,
    activityDate: String,
    activityPlace: String,
    activityMembers: String,
    activityCommentaires:[commentaireSchema],
    activityPrice: String,
    activityResume: String,
    numberLike: Number,
    activityDepartement: String,
    author:String

});

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    userName: String,
    genre: String,
    city: String,
    activities:String,
    liked:Array
});

// MONGOOSE MODEL //
var activityModel = mongoose.model('activity', activitySchema);

var userModel = mongoose.model('users', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  activityModel.find(
    function (err, data) {
      res.json(data);
      console.log(data);
      console.log('data sent from the server');
    })
});

router.post('/post-activity', function(req, res, next) {

  var newActivity = new activityModel({
      activityName: req.body.activityName,
      activityTheme: req.body.activityTheme,
      activityDate: req.body.activityDate,
      activityPlace: req.body.activityPlace,
      activityMembers: req.body.activityMembers,
      activityPrice: req.body.activityPrice,
      activityResume: req.body.activityResume,
      activityDepartement: req.body.activityDepartement,
      author:req.body.author,
      numberLike: 0
  });

  newActivity.save(
      function (error, activity) {
        res.json(activity);
      }
    );
  });


router.post('/post-commentaires', function(req, res, next) {

  console.log(req.body);
  var now = moment().format('MMMM Do YYYY, h:mm:ss a');

  activityModel.findOne({
    _id: req.body._id
  }, function(err, activity){

  activity.activityCommentaires.push({
    commentaire: req.body.commentaire,
    username: req.body.username,
    date: now
  })

    activity.save(function (error, activities) {
      res.json({activities});
    });
  })
});

router.post('/post-signup', function(req, res, next) {
  console.log(req.body);

  var newUser = new userModel ({
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
    genre: req.body.genre,
    city: req.body.city,
    activities: req.body.activities
});

  newUser.save(
      function (error, user) {
        res.json(user);
      }
    );
  });

router.post('/update-account', function(req, res, next) {
  console.log(req.body);

  userModel.update(
    { _id: '5bcef1a96d3bb1aba2ae9dad'},
      { email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      genre: req.body.genre,
      city: req.body.city,
      activities: req.body.activities },
        function(error, raw) {
        console.log('update avec succès');
      }
    );
});


router.get('/logout', function(req, res, next) {
  var isLoggedIn = false;
  res.json({isLoggedIn: isLoggedIn});
});

router.post('/post-login', function(req, res, next) {

    userModel.find(
      { email: req.body.email, password: req.body.password} ,
        function (err, user) {
            var userExist;
            if (user.length>0) {
              userExist = true;
              res.json({result: user});
            }else {
              userExist = false;
              res.json({result: userExist});
            }
        }
    )
});

router.post('/like-activity', function(req, res, next) {
  console.log('like route');


  activityModel.findOne(
    {_id: req.body.activity_id},
   function(err, activity){
     console.log(activity);
    activity.updateOne({
      numberLike: activity.numberLike +1
    },function(error, raw) {
      }
    );
  }
)

userModel.findOne({
  _id: req.body.user_id
}, function(err, user){

  user.liked.push({
    activityLike:req.body.activity_id
    })

  user.save(function (error, activitiesLike) {
    res.json(activitiesLike);
    });
  })
});

router.post('/get-like-activity', function(req, res, next) {
  userModel.findOne({
    _id: req.body.user_id
  }, function(err, user){
    if (user != undefined) {

var activitiesLiked=[];
var counter = 0;
for (var i = 0; i < user.liked.length; i++) {

console.log(user.liked[i].activityLike, "1");

    activityModel.findOne({
      _id: user.liked[i].activityLike
    }, function(err, like){

      activitiesLiked.push(like);
      console.log(like,'#########');

      if(counter == user.liked.length - 1) {
      res.json(activitiesLiked);
      }
      counter ++;
      })
     }
   }
  })
});

router.post('/dislike-activity', function(req, res, next) {
console.log('dislike route');
  activityModel.findOne(
    {_id: req.body.activity_id},
   function(err, activity){
     console.log(activity);
    activity.updateOne({
      numberLike: activity.numberLike -1
    },function(error, raw) {
      }
    );
  }
)

userModel.findOne({
  _id: req.body.user_id
}, function(err, user){

var iToDelete;
for (var i = 0; i < user.liked.length; i++) {

    if(user.liked[i].activityLike == req.body.activity_id) {
      iToDelete = i;
    }
  }

user.liked.splice(iToDelete, 1);

user.save();
  var isLiked = false;
  res.send(isLiked)
  })
})

router.post('/isLiked-activity', function(req, res, next) {
userModel.findOne({
  _id: req.body.user_id
}, function(err, user){

if (user != undefined) {

for (var i = 0; i < user.liked.length; i++) {

    if(user.liked[i].activityLike == req.body.activity_id) {
      var isLiked = true;
      res.send(isLiked)
      }
    }
   }
  }
)
})


module.exports = router;
