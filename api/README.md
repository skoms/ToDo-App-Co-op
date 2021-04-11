# REST-API

## Technologies
* JavaScript
* Node.js
* Express
* Sequelize
* SQLite
* bcryptjs
* basic-auth

## Introduction
This is the back-end REST API with basic authentication and authorization as well as come extra login features. It has 2 tables, 'Users' and 'Tasks', the two are associated.

### Paths
* GET    '/'              - Welcome message
* GET    '/api'           - Welcome message, and recommended route
* GET    '/api/users'     - authenticated user info
* GET    '/api/users'     - authenticated user info
* GET    '/api/tasks'     - displays all tasks for authenticated user
* GET    '/api/tasks/:id' - displays specific task for authenticated user
* POST   'api/users'      - creates a new user and stores it if meets requirements
* POST   'api/tasks'      - creates a new Task and assigns the logged authenticated user as its owner
* PUT    'api/tasks/:id'  - updates the chosen Task if the user is authenticated to do so
* DELETE 'api/tasks/:id'  - deletes the chosen Task if the user is authenticated to do so

## Additions
* User Login - Username is case insensitive
* User Login - Password requirements: 8 - 20 characters, minimum 1 lowercase letter, 1 uppercase letter and a digit ( Commented out to prevent conflicting with project requirements, but feel free to uncomment to see that it works perfectly :^) )
