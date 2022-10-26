/**
 * @file Declares User data type representing all critical information
 * that the system must store for a user.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
export default class User {
   private username: string = '';
   private password: string = '';
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;

   constructor(username: string, password: string, firstName: string,
               lastName: string, email: string) {
       this.username = username;
       this.password = password;
       this.firstName = firstName;
       this.lastName = lastName;
       this.email = email;
   }
}
