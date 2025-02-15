import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';


const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.get("/create", (req, res) => {
    res.render("create.ejs");
  });


  
app.get("/posts", (req, res) => {
    res.render("posts.ejs", {Packages: posts});  // the redirect hits up this get again so i want to also render all the posts in the posts array each time the page is opened
  });

app.post("/portal", (req, res) => {
    res.render("create.ejs");
});

app.post("/createPost", (req, res) => {
    const post = {
        id: uuidv4(),
        creator: req.body["Creator"],
        content: req.body["Content"],
    };
    posts.push(post);
    console.log(post.id);
    res.redirect("/posts");
});

app.post("/edit", (req, res) => {
  const value = req.body["id"];
  const postToEdit = posts.find(post => { //find is being used here to only return a single object.
    return post.id === value; //returns the object with an id equal to value
  });
  res.render("edit.ejs", {Package: postToEdit});

});

app.post("/editPost", (req, res) => {
  const editedPost = {
    id: req.body["id"],
    creator: req.body["Creator"],
    content: req.body["Content"],
  };
  posts = posts.map(post => {
    if (post.id === editedPost.id) {
      return editedPost;
    } 
    return post;
  });
  res.redirect("/posts");
});

app.post("/delete", (req, res) => {
  const value = req.body["id"];
  const postToDelete = posts.find( post => {
    return post.id === value;
  });
  posts = posts.filter(post => {
    return post !== postToDelete
  }); //using filter here to return a whole array. In this case return everything that is not equal to null
  res.redirect("/posts");

});

app.listen(port, () => {
    console.log(`Welcome aboard Captain! All systems online via port ${port}`);
  });