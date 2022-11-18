import UserDao from "../daos/user-dao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {

  const userDao: UserDao = UserDao.getInstance();

  const signup = async (req, res) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    const existingUser = await userDao
        .findUserByUsername(req.body.username);
    if (existingUser) {
       res.sendStatus(403);
       return;
    } else {
      const insertedUser = await userDao
          .createUser(newUser);
      insertedUser.password = '';
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }
  app.post("/api/auth/signup", signup);

  const profile = (req: Request, res: Response) => {
  // may need <atsign>ts-ignore here if errors thrown
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }

  const logout = (req, res) => {
     req.session.destroy();
     res.sendStatus(200);
  }

  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);


}

export default AuthenticationController;