# react-antd-playground
This is an initial project aims to integrate with react and ant-design. 
It is used create-react-app to init a react application with babel and webpack.

For reference, please visit:
https://ant.design/docs/react/use-with-create-react-app

<a href="https://coding-playground.000webhostapp.com/">Demo</a>

<b>Installation:</b>

\> npm install

<b>Run the project: </b>

\> npm start

<b>Build the project:</b>

\> npm run build

This application is still under development. Additional features will be published once ready.

Components structure
src/index.js
 |-components/MyLayout.js
    |-components/Dashboard.js
        |-components/DashboardCards.js
            |-components/MessageCard.js
            |-components/TaskCard.js
            |-components/ShoppingCards.js
            |-components/MailCard.js
        |-components/DashboardChart.js
    |-components/Calendar.js
    |-components/MapPage.js
        |-components/GoogleMap.js
        
<u>26 Jun 2018 release</u>
1. Make ajax request to NZTA API to get the official parking information within New Zealand and show the parking location on Google Map.
2. Added Google Authentication feature
