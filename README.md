# Social Network API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### Description
This app is a Social Network API utilizing mongoose/mongoDB for CRUD operations 

[Video Walkthrough Part 1](https://drive.google.com/file/d/1qWJHFSy88hzglU6_bs_kLbvkDLZOy0Tp/view)

[Video Walkthrough Part 2](https://drive.google.com/file/d/11toEo5iwK2hLPNI9QoIFZz7YjO9GmZ7d/view)
### Installation
install dependancies

    npm install 

start server

    npm start

### Contributions
[Issues and Pull requests can be made to this repo](https://github.com/SuedePritch/scaling-disco)
### Technology
* NodeJS
* Express
* MongoDB
* Mongoose
* dotenv

### API routes

* Get all users - GET - /api/user/
* Get one user - GET - /api/user/:id
* New user - POST - /api/user/
* Update user - PUT - /api/user/:id
* Delete user - DELETE - /api/user/:id

* Get all thoughts - GET - /api/thought/
* Get one thought - GET - /api/thought/:id
* New thought - POST - /api/thought/
* Update thought - PUT - /api/thought/:id
* Delete thought - DELETE - /api/thought/:id

* Get all reactions - GET - /api/:thoughtId/reaction
* Delete reaction - DELETE - /api/:thoughtId/reaction/:reactionId