/**
 * @file Declares AccountType data type of user's account type
 */

/**
 * @typedef AccountType Represents account type of user
 * @property {string} Personal "PERSONAL"
 * @property {string} Academic "ACADEMIC"
 * @property {string} Professional "PROFESSIONAL"
 */

enum AccountType {
    Personal = 'PERSONAL',
    Academic = 'ACADEMIC',
    Professional = 'PROFESSIONAL'
}

export default AccountType;