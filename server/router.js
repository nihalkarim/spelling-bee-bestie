const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos); // TODO
  app.get('/getLetters', mid.requiresLogin, controllers.Letter.getLetters);
  app.get('/getWords', mid.requiresLogin, controllers.Words.getWords);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage); // TODO
  app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo); // TODO

  app.get('/letter', mid.requiresLogin, controllers.Letter.letterPage);
  app.post('/letter', mid.requiresLogin, controllers.Letter.makeLetter);

  app.get('/words', mid.requiresLogin, controllers.Words.wordsPage);
  app.post('/words', mid.requiresLogin, controllers.Words.makeWord);

  // app.get('/setup', mid.requiresLogin, controllers.Setup.setupLetterPage);
  // app.post('/setup', mid.requiresLogin, controllers.Setup.makeLetterSetup);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.delete('/deleteDomo', mid.requiresSecure, mid.requiresLogin, controllers.Domo.deleteDomo); // TODO
};

module.exports = router;
