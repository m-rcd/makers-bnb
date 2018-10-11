const Browser = require('zombie');

Browser.localhost('example.com', 3000);

describe('User can visit homepage', function() {
  const Browser = new Browser();

  before(function(done) {
    browser.visit('/',done);
  });

  it('should see welcome page', function() {
    browser.assert.text('title', 'Welcome to Makers Bnb')
  });
});
