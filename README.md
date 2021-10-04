## :rocket: Launch Guide

1. Before running the tests, you have to provide the values for VK credentials:
- app access token;
- app id (this is the same as user id);
- login for the VK user account (a phone number or an email);
- password for the VK user account.  

2. To do this:
- go to the `src/environment` directory;
- open the file `credentials.cjs`;
- enter your credentials instead `null` values.

3. Open a terminal in the project root.

4. Enter `npm install` to install all of the required dependencies.

5. Enter `npm test` to launch the test suite execution.

6. Logging test output you can see in the terminal.
