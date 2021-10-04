import { Element } from "../element/element.cjs";


export class BaseForm {

  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
    this.form = new Element(this.locator, this.name);
  }

  async waitForFormIsOpened() {
    return this.form.state().isExists();
  }

  async waitFormNoLongerDisplayed() {
    return this.form.state().isDisplayed(true);
  }
};