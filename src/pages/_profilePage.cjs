import { UserWall } from "../forms/userWall.cjs";

class ProfilePage {

    get userWall() {
        return new UserWall();
    }

}

export const profilePage = new ProfilePage();