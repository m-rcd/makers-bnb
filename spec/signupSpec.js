const Browser = require('zombie');

Browser.localhost('localhost', 3000);

describe('User can signup', function() {
  const browser = new Browser();

  beforeEach((done) => {
    browser.visit('/', done);
  });

  it('should be successful', function() {
    browser.assert.success()
  });

  // it('should be able to sign up', function(done) {
  //   browser.pressButton('Sign up', done)
  //   browser.fill('username', 'hello')
  //   browser.fill('email', 'hello@mail.com')
  //   browser.fill('password', '12345')
  //   browser.pressButton('Sign up', done)
  //   browser.assert.text('h1', 'Hello, hello')
  // })
});
