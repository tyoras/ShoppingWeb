import { ShoppingWebApp } from './app.po';

describe('ng-demo App', () => {
  let page: ShoppingWebApp;

  beforeEach(() => {
    page = new ShoppingWebApp();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Shopping App');
  });
});
