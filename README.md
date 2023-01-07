# Memento - Social Media application implemented using MERN stack
## About Project
This project is Developed using MERN stack (MongoDB, Express, React.js, Node.js) where users can posts their memories.
## Project is Live at: https://mementosv.netlify.app
<img width="1431" alt="mementoDisplay" src="https://user-images.githubusercontent.com/48671736/211172028-06f5a8a2-0d9a-47cc-b182-14e6a7480a41.png">


### Features

- Authentication using JWT
- State management was implemented using redux
- Google SignIn using Google API
- CRUD operations
- MongoDB database

### Run project in your Localhost environment

Open terminal on change directory to ```/server``` using ```cd server``` <br>
Run the ```npm start``` command to run the server <br>

Open a new terminal using split terminal and change directory to ```/client``` using ```cd client``` <br>
Run the ```npm start``` command within the client directory to run the frontend <br>

### Deployement Process

#### Server deployement
- Go to www.render.com and sigin using your Github profile
- Provide you applications public repository link.
- Indicate the root location as server directory.
- Url: https://memento-uufs.onrender.com

#### Frontend deployement
- Go to client directory of your project and run ```npm run build``` to create a Build version of the application
- Go to www.netlify.com
- Upload the Build folder 
- Site at: https://mementosv.netlify.app/posts
## Demo

### Sign Up

- User can signup by entering their basic detail if they don't have a Google account.

https://user-images.githubusercontent.com/48671736/211172074-828e0ddf-c453-4664-8b12-6356e9b426de.mov


### CRUD operations

- User can Create a post by adding title, message, tags, and upload an image file.
- User can update a post that was uploaded by them.
- User can delete only the post created by them.
- User can like their post as well as other users posts.

https://user-images.githubusercontent.com/48671736/211172075-0dbeb202-b955-4057-a83e-dd123969286b.mov



### JWT Authentication

- When a user logs in a JSON web token is generated from the backend.
- When a user logs out the JSON web token which is stored in the browsers local storage is destroyed and user session ends.

https://user-images.githubusercontent.com/48671736/211172077-8b731f8b-8893-4b33-b9dd-2fbdaf7d207a.mov



### Google Sign In

- First install the Javascript library for google login ```npm install @react-oauth/google```
- Go to console.cloud.google.com 
- Get your credentials which is the oauth client id and use this client id to connect to google service.

https://user-images.githubusercontent.com/48671736/211172082-d30998bf-f82b-4dca-9e55-890fed8666bc.mov

### MongoDB schema
<img width="1512" alt="MongoDBschema" src="https://user-images.githubusercontent.com/48671736/211172094-941e9ce2-dbbb-41bc-b7d6-6c1a64c42a1a.png">



## Learing outcomes

- MERN stack
- MongoDB
- Google APIs
- Redux
- Web Application deployement

## Contributors

Swapnil Verlekar : https://github.com/swapnilverlekar <br>
Anurag Bambardekar : https://github.com/AnuragBambardekar <br>

### Resources

https://reactjs.org/docs/getting-started.html <br>
https://www.mongodb.com/atlas/database <br>
console.cloud.google.com <br>
https://www.youtube.com/@javascriptmastery <br>
