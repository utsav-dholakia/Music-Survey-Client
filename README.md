# Music-Survey-Client
This project creates a client utilizing React.js that comsumes data provided by REST services and presents them onto the webpages. Also, it provides a page where users will be submitting their Music Preferences via a simple survey.
There are 3 pages: 
1. Home page where users can submit their survey. 
2. Admin login page where admin can login.
3. Admin interface where admin will be able to see results of the survey such as: Total survey submitted, average age of users who submitted survey, most and lease popular artist and most frequent region where the survey is submitted from.


### __ASSUMPTIONS__
* The survey has pre-defined list of artists and region values and only one can be chosen for artist.
* In the case of tie in the results of Most popular / Lease popular artist or Most frequent region, the first row in the result set is returned. This can be modified easily to accomodate any changes necessary.
* The admin login username/password values: 'admin'/'password'


### __STEPS TO RUN__
* Clone this repository.
* Run __npm update__ command at the root of the project. This will download and update all the dependacies needed to run/test this server.
* If there is an issue in in this step from create-react-app framework, remove '-' and make all letters small case in the project name and try again.
* Start server created using Music-Survey-Server project first.
* To run the application, use __npm start__ command at the root of project directory, and open 'localhost:3000' on browser.
* To test the application, use __npm test__ command at the root of project directory. This basic test will verify if the application DOM is rendered correctly or not.


## __Note__
* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
* The create-react-app provides inbuilt server for hosting the client app.
* This project is built using Webstorm IDE from JetBrains.
