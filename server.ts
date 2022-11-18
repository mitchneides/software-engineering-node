/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";
import BookmarkController from "./controllers/BookmarkController";

const cors = require('cors')
// Allows a .env file to be created to store environment variables
require('dotenv').config()

// Options for mongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.olu5i3x.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString, options);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Software Engineering Final Project!'));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

// express session
const session = require("express-session");
let sess = {
   secret: process.env.SECRET,
   cookie: {
       secure: false
   }
}
if (process.env.ENV === 'PRODUCTION') {
   app.set('trust proxy', 1) // trust first proxy
   sess.cookie.secure = true // serve secure cookies
}


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
