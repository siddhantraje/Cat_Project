import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(link: string) {
    return browser.get(link) as Promise<any>;
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText() as Promise<string>;
  }

  getAllElements(selector: string){
    return element.all(by.css(selector))
  }
}
