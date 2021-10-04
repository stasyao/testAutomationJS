import { LeftSideBar } from "../forms/leftSideBar.cjs";

class MainPage {

    get leftSideBar() {
        return new LeftSideBar();
    }

}

export const mainPage = new MainPage();
