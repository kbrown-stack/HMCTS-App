---
title: Untitled

---

# HMCTS Task Manager App

This project was built as part of the [HMCTS Developer Challenge](https://github.com/kbrown-stack/HMCTS-App). It is a simple task management web application that demonstrates full-stack development skills using Node.js, Express, MongoDB, and EJS.

## 🚀 Features

- Create, view, update, and delete tasks (CRUD operations)
- Flash messages for success/error notifications
- Session handling using `express-session`
- MongoDB integration with Mongoose
- EJS templating for dynamic rendering
- Clean and modular project structure

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **EJS**
- **dotenv** for environment variable management

## 🛠 Dependencies 
- **express-ejs-layouts**
- **express-session**
- **cors**
- **connect-flash**
- **Nodemon**

## Usage
*Please kindly visit the local host after installing all dependencies mentioned above;
- Visit `http://localhost:4002` to enable you have access to the API. 


## 📁 Project Structure

HMCTS Task Manager/
│
├── app.js                  # Main application entry point
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables (not committed)
│
├── models/
│   └── Task.js             # Mongoose Task schema
│
├── routes/
│   └── taskRoutes.js       # All task-related routes
│
├── views/
│   ├── layouts/
│   │   └── main.ejs        # Layout template with EJS include
│   │
│   ├── partials/
│   │   ├── header.ejs      # Reusable header partial
│   │   └── footer.ejs      # Reusable footer partial
│   │
│   ├── index.ejs           # Home/Task list page
│   ├── create.ejs          # Task creation form
│   ├── edit.ejs            # Edit task form
│   └── view.ejs            # Single task view
│
├── public/                 # Static files
│   ├── css/
│   │   └── style.css       # Optional styles
│   └── js/
│       └── main.js         # Optional JS
│
└── README.md               # Project overview and instructions

## License
This project is licensed under the MIT License.
