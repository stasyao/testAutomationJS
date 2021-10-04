import { When } from '@cucumber/cucumber'
import { mainPage, profilePage } from '../../pages/pages.cjs';


When(
    /^Goes to 'My page'$/,
    async function() {
        await mainPage.leftSideBar.goToTheWall();
        expect(
            await profilePage.userWall.waitForFormIsOpened(),
            'VK user page is not opened'
        ).to.be.true;
    }
)