import { LoginForm } from "../forms/loginForm.cjs";

class EntryPage {

    get loginForm() {
        return new LoginForm();
    }

}

export const entryPage = new EntryPage();