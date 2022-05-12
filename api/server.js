import  express from "express"
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from "./models/User.js";


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

// // connecting to the DataBase
//  await mongoose.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true,useUnifiedTopology:true,});

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// const username = "kezia";
// const password = "MyNewPass";
// const cluster = "RedditCloneDB";
// const dbname = "myFirstDatabase";

// mongoose.connect(
//    "mongodb+srv://kezia:MyNewPass@redditclonedb.4etyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );

// const username = "kezia";
// const password = "MyNewPass";
// const cluster = "redditclonedb";
// const dbname = "redditDB";

// await mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );



// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });


app.get('/', (req, res) => {
    res.send('ok');
  });

  //API end points for register 
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


app.listen(4000 , () => {
    console.log("Server is running at port 4000");
  });

  