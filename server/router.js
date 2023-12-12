const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getLetters', mid.requiresLogin, controllers.Letter.getLetters);
  app.get('/getWords', mid.requiresLogin, controllers.Words.getWords);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/letter', mid.requiresLogin, controllers.Letter.letterPage);
  app.post('/letter', mid.requiresLogin, controllers.Letter.makeLetter);

  app.get('/word', mid.requiresLogin, controllers.Words.wordsPage);
  app.post('/word', mid.requiresLogin, controllers.Words.makeWord);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
