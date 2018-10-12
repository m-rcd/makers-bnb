const Browser = require('zombie');

Browser.localhost('localhost', 3000);

describe('User can visit homepage', function() {
  const browser = new Browser();

  beforeEach((done) => {
    browser.visit('/', done);
  });

  it('should be successful', function() {
    browser.assert.success()
  });

  it('should see welcome page', function() {
    browser.assert.text('h1', 'Welcome to Makers Bnb')
  });
});
