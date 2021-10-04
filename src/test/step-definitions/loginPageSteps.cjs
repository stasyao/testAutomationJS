import { Given, When } from '@cucumber/cucumber'

import { credentials } from '../../environment/credentials.cjs';
import { entryPage, mainPage } from '../../pages/pages.cjs';
import { testEnvironment } from '../../environment/testEnvironment.cjs';


const { vkLogin, vkPassword } = credentials;

Given(
    /^The user opens the VK main page$/,
    async () => {
        await browser.url(testEnvironment.vkEntryUrl);
        expect(
            await entryPage.loginForm.waitForFormIsOpened(),
            'VK entry page is not opened'
        ).to.be.true;
    }
)

When(
    /^Enters his login and password$/,
    async () => {
        await entryPage.loginForm.signIn(vkLogin, vkPassword);
        expect(
            await mainPage.leftSideBar.waitForFormIsOpened(),
            'VK main page does not appear after sign in'
        ).to.be.true;
    }
)