import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { StitchClientFactory } from "mongodb-stitch";
import { browserHistory, Route } from "react-router";
import AuthControls from './components/AuthControls'
import MyLayout from './components/MyLayout'

import async from './async'
let Calendar = async(() => import("./components/Calendar"));
let Dashboard = async(() => import("./components/Dashboard"));
let MapPage = async(() => import("./components/MapPage"));
let GalleryPage = async(() => import("./components/GalleryPage"));


let appId = "codingplayground-jisdm";
if (process.env.APP_ID) {
  appId = process.env.APP_ID;
}

let mongodbService = "mongodb-atlas";
if (process.env.MONGODB_SERVICE) {
  mongodbService = process.env.MONGODB_SERVICE;
}

let options = {};
if (process.env.STITCH_URL) {
  options.baseUrl = process.env.STITCH_URL;
}

let stitchClientPromise = StitchClientFactory.create(appId, options);

stitchClientPromise.then(stitchClient => {
    let db = stitchClient.service("mongodb", mongodbService).db("CodingPlayground");
    let user = db.collection("user");
    let props = {stitchClient, user};
    ReactDOM.render(
      <BrowserRouter>
        <div>
          <Route exact path="/*" render={routeProps => <MyLayout {...props} {...routeProps}/>}/>
        </div>
      </BrowserRouter>,
      document.getElementById("root")
    );
  })

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
