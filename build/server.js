"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeDao_1 = __importDefault(require("./daos/LikeDao"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowDao_1 = __importDefault(require("./daos/FollowDao"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkDao_1 = __importDefault(require("./daos/BookmarkDao"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageDao_1 = __importDefault(require("./daos/MessageDao"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
// LOCAL DB connection
// mongoose.connect('mongodb://localhost:27017/tuiter');
// REMOTE DB connection
// mongoose.connect('mongodb+srv://alice:superdupersecretpassword@cluster0.olu5i3x.mongodb.net/tuiter?retryWrites=true&w=majority')
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering!!!!'));
app.get('/hello', (req, res) => res.send('Welcome to Foundation of Software Engineering!'));
const userDao = UserDao_1.default.getInstance();
const uController = UserController_1.default.getInstance(app);
const tuitDao = TuitDao_1.default.getInstance();
const tController = TuitController_1.default.getInstance(app);
const likeDao = LikeDao_1.default.getInstance();
const lController = LikeController_1.default.getInstance(app);
const followDao = FollowDao_1.default.getInstance();
const fController = FollowController_1.default.getInstance(app);
const bookmarkDao = BookmarkDao_1.default.getInstance();
const bController = BookmarkController_1.default.getInstance(app);
const messageDao = MessageDao_1.default.getInstance();
const mController = MessageController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
