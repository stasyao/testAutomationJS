export class ElementStateProvider {

  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
  }

  async isExists(reverse) {
    return (await $(this.locator)).waitForExist(
      { reverse: reverse || false }
    );
  }

  async isClickable(reverse) {
    return (await $(this.locator)).waitForClickable(
      { reverse: reverse || false }
    );
  }

  async isDisplayed(reverse) {
    return (await $(this.locator)).waitForDisplayed(
      { reverse: reverse || false }
    );
  }

  async isTextChanged(newText) {
    const elem = await $(this.locator);
    await elem.waitUntil(
      async () => {
        return (await elem.getText()) === newText
      },
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s'
      }
    );
  };

}