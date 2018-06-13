
const passport = require("passport")
let db = require('../db/db_info.js');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    db.one('SELECT * FROM users WHERE username = ${username}',
           {username: username})
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
}