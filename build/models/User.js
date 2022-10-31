"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Declares User data type representing all critical information
 * that the system must store for a user.
 */
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
/**
 * @typedef User Represents all critical information that the system must store for a user.
 * @property {string} username User's unique username that will be displayed publicly.
 * @property {string} password User's private password for authentication.
 * @property {string} firstName User's first name.
 * @property {string} lastName User's last name.
 * @property {string} email User's email address.
 * @property {string} profilePhoto User's profile photo imageName.
 * @property {string} headerImage User's header photo imageName.
 * @property {MaritalStatus} accountType The type of account.
 * @property {AccountType} maritalStatus Users marital status.
 * @property {string} biography Extra information about the user to be displayed in profile.
 * @property {string} dateOfBirth User's birthday.
 * @property {Date} joined Date the account was created.
 * @property {Location} location Location of user.
 */
class User {
    constructor(username, password, firstName, lastName, email) {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
exports.default = User;
