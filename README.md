
# React Todo list

![mongoDB](https://img.shields.io/badge/-mongoDB-success) ![express](https://img.shields.io/badge/-express-red) ![react](https://img.shields.io/badge/-React-blue) ![Node](https://img.shields.io/badge/-nodejs-green) ![materialui](https://img.shields.io/badge/framework-Material--UI-blue)

## Description. 

A simple todo list app built in React with MERN stack and Material-UI with this features: 
* Log In: The registration requires a username, an email & password. 
* Create Projects and the tasks associated with them.
* Tasks can be created, deleted, edited, and marked as complete.
* For each task there is the option of setting a deadline for completion in a user-friendly way.
* Log out 
* Light/dark mode (based on device settings)

## [Live Demo](https://labwebtodo.netlify.app/) 

  
## Screenshots

<a href="https://imgflip.com/i/58u5xb"><img src="https://i.imgflip.com/58u5xb.jpg" title="login"/></a>
<a href="https://imgflip.com/i/58u7ba"><img src="https://i.imgflip.com/58u7ba.jpg" title="dashboard"/></a>

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/JaimeSolisS/ReactTodoList
```

Go to the project directory

```bash
  cd ReactTodoList
```

### Client

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Add **client/.env.devolpment.local** 

```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

Start the server

```bash
  npm start
```
### Server

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Add **server/variables.env** 

```env
DB=mongodb_connection_string_here
TOKEN=secret_token_here
```

Start the server

```bash
  npm run dev
```

  
