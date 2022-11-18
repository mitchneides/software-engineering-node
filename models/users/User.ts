/**
 * @file Declares User data type representing users.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User represent user
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

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
};
