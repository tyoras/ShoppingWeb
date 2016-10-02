describe('About', () => {

  beforeEach( () => {
    browser.get('/about');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sweb-about h2')).getText()).toEqual('Features');
  });

});
