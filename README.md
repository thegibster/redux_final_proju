# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

### Setup

To clone the repo or copy the url to proceed to the direct link:
```sh
$ git clone https://github.com/thegibster/redux_final_proju
```
 ```
This project uses the npm packages for the api server :

        "body-parser": "^1.17.1",
        "clone": "^2.1.1",
        "cors": "^2.8.3",
        "dotenv": "^4.0.0",
        "express": "^4.15.2",
        "morgan": "^1.9.0"
```
 ```
 This project uses the npm packages for the front-end :

     "material-ui": "^0.20.0",
         "morgan": "^1.9.0",
         "muicss": "^0.9.29",
         "react": "^16.1.0",
         "react-dom": "^16.1.0",
         "react-loader": "^2.4.2",
         "react-redux": "^5.0.6",
         "react-router-dom": "^4.2.2",
         "react-scripts": "1.0.17",
         "redux": "^3.7.2",
         "redux-thunk": "^2.2.0",
         "uuid": "^3.1.0"
```
* Install and start the Backend API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window navigate to the project root and
    - `cd frontend`
    - `npm install`
    - `npm start`


### Services provided
1. Any anonymous user can view all posts
2. Posts can be sorted by timestamp or votescore
3. Posts and a posts' comments votescores can be increased and decreased
3. Any user is able to create a new post as well as comment on any post



## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
