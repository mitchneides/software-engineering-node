/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";

import uDao from "./daos/UserDao";
import userController from "./controllers/UserController";
import tDao from "./daos/TuitDao";
import tuitController from "./controllers/TuitController";
import lDao from "./daos/LikeDao";
import likeController from "./controllers/LikeController";
import fDao from "./daos/FollowDao";
import followController from "./controllers/FollowController";
import bDao from "./daos/BookmarkDao";
import bookmarkController from "./controllers/BookmarkController";
import mDao from "./daos/MessageDao";
import messageController from "./controllers/MessageController";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tuiter');

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

const userDao = uDao.getInstance();
const uController = userController.getInstance(app);
const tuitDao = new tDao();
const tController = new tuitController(app, tuitDao);
const likeDao = lDao.getInstance();
const lController = likeController.getInstance(app);
const followDao = fDao.getInstance();
const fController = followController.getInstance(app);
const bookmarkDao = bDao.getInstance();
const bController = bookmarkController.getInstance(app);
const messageDao = mDao.getInstance();
const mController = messageController.getInstance(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
