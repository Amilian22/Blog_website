//jshint esversion:6
import express from "express";
import lodash from "lodash";
import mongoose from "mongoose";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://angelmilian19092000:iquWuK80sHvPuzeA@cluster0.rrhdrkj.mongodb.net/task");
    console.log("DB is connect")

  }
  catch (error) {
    console.log(error)
  }
}

connectDb();

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const Task = mongoose.model("Task", taskSchema)


app.get("/", async (req, res) => {
  const user1 = await Task.find();
  const homeSaved = { title: "Home", content: "This is my new project, i expected you like it, and i will convert a really good developer" }
  res.render("home.ejs", { contentHome: homeSaved, posts: user1 })
})

app.get("/about", (req, res) => {
  res.render("about.ejs", { contentAbout: aboutContent })
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contentContact: contactContent })
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs")
})


app.post("/compose", async (req, res) => {
  const taskAdd = new Task({
    title: req.body.titleForm,
    content: req.body.postBody
  })
  await taskAdd.save()
  res.redirect("/")
})

app.get("/posts/:tasks", async (req, res) => {
  const posts = await Task.find()
  posts.forEach((valor) => {
    let cosa = lodash.lowerCase(req.params.tasks);
    let cosa2 = lodash.lowerCase(valor.title);
    if (cosa == cosa2) {
      res.render("post.ejs", { title: valor.title, content: valor.content })
    } else (
      console.log("No Match")
    )
  })
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});


