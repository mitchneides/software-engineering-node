/**
 * @file Implements mongoose schema for users.
 */
import mongoose from "mongoose";
import User from "../../models/users/User";
import AccountType from "../../models/users/AccountType";
import maritalStatus from "../../models/users/MaritalStatus";

/**
 * @typedef UserSchema represent user
 * @property {string} id user's id
 * @property {string} username user's username
 * @property {string} password user's password
 * @property {string} firstName user's first name
 * @property {string} lastName user's last name
 * @property {string} email user's email
 * @property {string} profilePhoto user's profile photo
 * @property {string} headerImage user's headerImage
 * @property {AccountType} accountType user's account type where AccountType is an enumeration
 * @property {MaritalStatus} maritalStatus user's marital status where MaritalStatus is an enumeration
 * @property {string} biography user's biography
 * @property {Date} dateOfBirth user's date of birth
 * @property {Date} joined user's joined date
 * @property {Location} location user's location
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: false, default: ''},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {
        type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
        default: AccountType.Personal
    },
    maritalStatus: {
        type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"],
        default: maritalStatus.Single
    },
    location: {
        latitude: Number,
        longitude: Number
    },
}, {collection: "users"});

export default UserSchema;