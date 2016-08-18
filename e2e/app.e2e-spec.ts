import { CoTreePage } from './app.po';

describe('co-tree App', function() {
  let page: CoTreePage;

  beforeEach(() => {
    page = new CoTreePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
