//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

// Extending the native String prototype.
// Comment from StackOverflow:
// More dogmatic developers may capitulate you strongly on that
// ("Don't modify objects you don't own". I wouldn't mind though).
// We shall see is this is a common/advised use case.
String.prototype.trunc =
      function(length= 300){
        if (this.length > length) {
          return _.truncate(this, {"length": length});

        } else {
          return this;
        }
      };

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    homeStart: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutStart: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactStart: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  // Tip: Start with the most restrictive variable type
  const post = {
    postTitle: req.body.newPostTitle,
    postText: req.body.newPostText
  }

  posts.push(post);

  res.redirect("/");

});

// Route parameters: "postId" is a dynamic part of the route which we are trying to access
app.get("/posts/:postId", function(req, res) {

  // transforms to all lower case and removes "_", "-"
  const requestedTitle = _.lowerCase(req.params.postId);

  // Search for requested route in the posts list, if it exists reneder it
  posts.forEach(function(post) {
    const currentTitleParsed = _.lowerCase(post.postTitle);
    const currentTitle = post.postTitle;
    const currentText = post.postText;

    if (currentTitleParsed === requestedTitle) {

      res.render("post", {
        postTitle: currentTitle,
        postText: currentText
      })

    }
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
