import { BaseForm } from "../framework/baseForm/baseForm.cjs";
import { Element } from "../framework/element/element.cjs";


export class LoginForm extends BaseForm {
    constructor() {
        super(
            '//div[@id="index_login"]',
            'VK Login form'
        )
    }

    get loginField() {
        return new Element(
            '//input[@type="text" and @id="index_email"]',
            'The field for entering an email or a phone number'
        )
    }

    get passwordField() {
        return new Element(
            '//input[@type="password" and @id="index_pass"]',
            'The password field'
        )
    }

    get submitButton() {
        return new Element(
            '//button[@id="index_login_button"]',
            'The button to sign in'
        )
    }

    async signIn(email, password) {
        await this.loginField.typeSecret(email);
        await this.passwordField.typeSecret(password);
        await this.submitButton.click();
    }

}
