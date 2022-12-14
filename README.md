# NS-Social-Network-API

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## About

This is the back-end for a social network API. It allows users to share their thoughts, create a friend list and react to friend's thoughts. It uses `Express.js` for routing, a `MongoDB` database, `Mongoose` ODM and seed data is created using `Insomnia`.

## Table of Contents

- [Made-With](#Made-with)
- [Install](#Install)
- [Notes](#Notes)
- [Application](#Application)
- [Screenshots](#Screenshots)
- [Liscense](#Liscense)
- [Credits](#Credits)
- [Questions](#Questions)

## Made-With

- MongoDB
- Express.js
- Node.js

Packages/Extras

- Insomnia
- Mongoose
- Express.js

## Install

After cloning the repo, run "npm i" or "npm install" in the command line to install dependencies.

Node.js and MongoDB are required to run this application

## Notes

- To use the applicaication run npm start in the comand line and test the REST API using Insomnia.
- In Insomnia use the following routes to view, add, update or remove users, thoughts, reaction or friends in the databse.

**USER**

- Create a new user: `POST /api/users`
- Get all users: `GET /api/users`
- Get a single user by its `id`: `GET /api/users/:userId`
- Update a user by its `id`: `PUT /api/users/:userId`
- Delete a user by its `id`: `DELETE /api/users/:userId` (also delets the thoughts associated with the user)

**FRIEND**

- Add a new friend to a user's friend list: `POST /api/users/:userid/friends/:friendId`
- Delete a friend from a user's friend list: `DELETE /api/users/:userid/friends/:friendId`

**THOUGHT**

- Create a new thought: `POST /api/thoughts/`
- Get all thoughts: `GET /api/thoughts/`
- Get a single thought by its `id`: `GET /api/thoughts/:thoughtId`
- Update a thought by its `id`: `PUT /api/thoughts/:thoughtId`
- Delete a thought by its `id`: `DELETE /api/thoughts/:thoughtId`

**REACTION**

- Create a reaction: `POST /api/thoughts/:thoughtId/reactions`
- Delete a reaction by the `reactionId`: `DEL /api/thoughts/:thoughtId/reactions/:reactionId`

## Application

**User routes**

https://drive.google.com/file/d/1K6wBBUefPj7UN0b1qaMilV4ms_78x11n/view?usp=sharing

**Thought routes**

https://drive.google.com/file/d/1wQslNcfvBWDNzxzxE6VnHheSCKyimO47/view?usp=sharing

## Screenshots

Application tested in Insomnia

![Screen Shot 2022-08-13 at 3 50 38 PM](https://user-images.githubusercontent.com/102773691/184517689-97f3b705-16f5-475d-9bec-a57be07a55ba.png)

## Liscense

This project is liscensed under the MIT liscense.

## Credits

Made by Nina Siegel

## Questions

For questions, email me at siegel.nina.m@gmail.com

To see more of my work visit https://github.com/nmsiegel1/
