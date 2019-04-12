require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expreessEdge = require("express-edge");
const edge = require("edge.js");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const cloudinary = require('cloudinary');
const validateCreatePost = require("./middleware/image");
const auth = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirectIfAuth");
const app = express();

/* if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined. use set myNodeJsBlog=mySecureKey');
  process.exit(1);

}; */

const createPostController = require("./controllers/createPostController");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(console.log("Database started"))
  .catch(err => console.log(`error starting database ${err}`));

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(expressSession);
app.use(fileUpload());
app.use(express.json());
app.use(express.static("public"));
app.use(expreessEdge);

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.set("views", `${__dirname}/views`);

app.get("/", homePageController);

app.get("/posts/new", auth, createPostController);

app.post("/posts/store", [auth, validateCreatePost], storePostController);

app.get("/posts/:id", getPostController);

app.get("/auth/register", redirectIfAuth, createUserController);

app.post("/users/register", redirectIfAuth, storeUserController);

app.get("/auth/login", redirectIfAuth, loginController);

app.post("/users/login", redirectIfAuth, loginUserController);

app.get("/auth/logout", auth, logoutController);

app.use((req, res)=> res.render('not-found'))

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
