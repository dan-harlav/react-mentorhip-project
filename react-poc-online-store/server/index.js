const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require ('dotenv').config()

const User = require("./database/User");


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};


//Connecting our database
mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('MongoDB connected...');
  })


const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static('/'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/sign-up", async (req, res) => {
  try {
    const {name, email, password} = req.body

    // Validate the name
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: `User is already registered.`
      });
    }

    // Get the hashed password
    const hashPassword = await bcrypt.hash(password, 12);

    // create a new user
    const newUser  = new User({
      name,
      email,
      password: hashPassword
    });

    await newUser.save();

    return res.status(201).json({
      message: "Now you are successfully registred."
    });
  } catch (err) {
    // Implement logger function if any
    console.log(JSON.stringify(err))
    return res.status(500).json({
      message: `${err.message}`
    });
  }
});


app.post("/sign-in", async (req, res) => {
    const {email, password} = req.body

    // First Check if the name is in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User email is not found. Invalid login credentials.",
      });
    }

  // That means user is existing and trying to signin fro the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          name: user.name,
          email: user.email
        },
        process.env.APP_SECRET,
        { expiresIn: "3 days" }
      );

      let result = {
        name: user.name,
        email: user.email,
        //token: `Bearer ${token}`,
        expiresIn: 168
      };
      // const date = new Date();
      // date.setHours(date.getHours() + 5);
      // res.setHeader('set-Cookie', `jwt=${token}; Expires=${date}; HttpOnly`)
      res.status(200).cookie('jwt', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
      });
      return res.json({
        ...result,
        message: "You are now logged in."
      });
    } else {
      return res.status(403).json({
        message: "Incorrect username or password."
      });
    }
  });

const jwtauth = (req, res, next) => {
  const cookies = req.cookies
  console.log(cookies)
  const token = cookies.jwt;
  if (!token) {
    return res.status(401).json("token not found");
  }

  try {
    console.log("middleware is working");
    const user = jwt.verify(token, process.env.APP_SECRET);
    console.log(user)
    if(user){
      next();
    }
  } catch (error) {
    return res.status(401).json("invalid token");
  }
}

app.use(jwtauth);

app.get("/products", async (req, res) => {
    res.sendFile(path.join(__dirname, "products.js"));
  });


app.post("/sign-out", (req, res) => {
  const cookies = req.cookies
  const token = cookies.jwt;
  if (!token) {
    return res.status(401).json("token not found");
  }

  try {
    console.log("middleware is working");
    const user = jwt.verify(token, process.env.APP_SECRET);
    if(user){
      res.cookie('jwt', null);
      return res.status(200).json("sign out succesfully");
    }
  } catch (error) {
    return res.status(401).json("invalid token");
  }
});

const port = process.env.PORT || 8004;
app.listen(port, () => console.log(`Listening on Port: ${port}`));