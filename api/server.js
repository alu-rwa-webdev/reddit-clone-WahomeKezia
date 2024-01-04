// server.js

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user information
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               username: exampleUser
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '422':
 *         description: Invalid username or password
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out user
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get comments
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search term for comments
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example: [comment1, comment2]
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments/root/{rootId}:
 *   get:
 *     summary: Get root comments
 *     parameters:
 *       - name: rootId
 *         in: path
 *         required: true
 *         description: ID of the root comment
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example: [comment1, comment2]
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example: comment1
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               parentId:
 *                 type: string
 *               rootId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example: newComment
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "./models/User.js";
import Comment from "./models/Comment.js";
import VotingRoutes from "./VotingRoutes.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import path from 'path';
import dotenv from 'dotenv'; // Import dotenv


dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT 
 
const secret = 'secret123';
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));



// production scrpit one 
// For serving static files from the 'client/build' directory
const currentModuleURL = new URL(import.meta.url);
const currentModuleDir = path.dirname(currentModuleURL.pathname);

app.use(express.static(path.resolve(currentModuleDir, 'client', 'build')));


app.use(VotingRoutes);

function getUserFromToken(token) {
  const userInfo = jwt.verify(token, secret);
  return User.findById(userInfo.id);
}

await mongoose.connect('mongodb+srv://kwahome:kwahome14@redditclone.oena6ts.mongodb.net/', {useNewUrlParser:true,useUnifiedTopology:true,});
const db = mongoose.connection;
db.on('error', console.log);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Run this to get the swagger.json 
// app.get('/api-docs', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

app.get('/', (req, res) => {
  res.send('ok , working Nodejs and Expressjs backend');
});

app.post('/register', (req, res) => {
  const {email,username} = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({email,username,password});
  user.save().then(user => {
    jwt.sign({id:user._id}, secret, (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(201).cookie('token', token).send();
      }
    });
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;

  getUserFromToken(token)
    .then(user => {
      res.json({username:user.username});
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}).then(user => {
    if (user && user.username) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign({id:user._id}, secret, (err, token) => {
          res.cookie('token', token).send();
        });
      } else {
        res.status(422).json('Invalid username or password');
      }
    } else {
      res.status(422).json('Invalid username or password');
    }
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').send();
});

app.get('/comments', (req, res) => {
  const search = req.query.search;
  const filters = search
    ? {body: {$regex: '.*'+search+'.*'}}
    : {rootId:null};
  Comment.find(filters).sort({postedAt: -1}).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/root/:rootId', (req, res) => {
  Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    res.json(comment);
  });
});

app.post('/comments', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  getUserFromToken(token)
    .then(userInfo => {
      const {title,body,parentId,rootId} = req.body;
      const comment = new Comment({
        title,
        body,
        author:userInfo.username,
        postedAt:new Date(),
        parentId,
        rootId,
      });
      comment.save().then(savedComment => {
        res.json(savedComment);
      }).catch(console.log);
    })
    .catch(() => {
      res.sendStatus(401);
    });
// production script 2
// // Catch-all route to serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV =="production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------


});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});