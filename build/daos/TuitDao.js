"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose to integrate with MongoDB
 */
const Tuit_1 = __importDefault(require("../models/Tuit"));
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() { }
    /**
     * Uses TuitModel to retrieve all tuits in the database
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTuitModels = yield TuitModel_1.default.find();
            return allTuitModels.map(tuitObj => new Tuit_1.default(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy));
        });
    }
    /**
     * Uses TuitModel to retrieve a tuit by its ID
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when the tuit is retrieved from
     * database
     */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tuitObj = yield TuitModel_1.default.findById(tid);
                return new Tuit_1.default(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
            }
            catch (e) {
                return "Tuit ID: " + tid + " does not match a tuit in the database";
            }
        });
    }
    /**
     * Uses TuitModel to retrieve all tuits by a specified user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default
                .find({ postedBy: uid })
                .populate('tuit')
                .exec();
        });
    }
    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit body of tuit to be posted
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitObj = yield TuitModel_1.default.create(tuit);
            return new Tuit_1.default(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
        });
    }
    /**
     * Updates tuit instance in the database
     * @param {string} tid PK of the tuit
     * @param {Tuit} tuit Updated body of the tuit
     * @returns Promise To be notified when instance is updated the database
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
    /**
     * Deletes tuit instance from the database
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when instance is deleted from the database
     */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao == null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
