# vicdevs

> Small social media site for developers in Victoria, BC

<!-- Badges -->

[![build status](https://img.shields.io/circleci/build/github/bryce-mcmath/vicdevs/master?label=circleci)](https://circleci.com/gh/bryce-mcmath/vicdevs)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

vicdevs.io is a fullstack CRUD app made to help connect developers in Victoria. Registered users can create a profile with their skills, education, and work experience, create posts, view others' posts and profiles, comment on posts, and like posts and comments. Most of it is made with Node.js, express, MongoDB, Sass, Redux, and modern React including custom hooks and reducers.

To learn more and see it in action, read further. Or visit it [(link here when live)]() eventually and join up!

**NOTE: If you want a profile pic, sign up with a Gravatar email.**

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Running the Tests](#running-the-tests)
- [Built with](#built-with)
- [Contributing](#contributing)
- [Meta](#meta)
- [Known issues / bugs](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)
  - [In the works](#in-the-works)
  - [Planned](#planned)
- [Acknowledgements](#acknowledgements)

## Usage

<!-- Gif -->

![vicdevs](https://raw.githubusercontent.com/bryce-mcmath/vicdevs/master/docs/screenshot.PNG)

The above gif demonstrate basic usage. For more screencaps and other documentation, please navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

First, clone this repository. Then install dependencies with `npm install` in both the root, and in /client.

Second, create a free MongoDB Atlas database instance [here](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)

Third, get a GitHub client secret and id by registering an OAuth app [here](https://github.com/settings/developers)

Lastly, add a default.json file in /config following the provided default.example.json file

#### Serving With Parcel and Node

Open two terminals, run the following in both the root and in /client:

```sh
npm run start
```

Navigate to the localhost port provided in the client terminal (likely :1234)

## Running the Tests

One day.

#### Running Unit and Integration Tests

TBA

#### Running End-to-End Tests

TBA

## Built with

- [React]() - Front-end framework
- [axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Sass](https://sass-lang.com/) - CSS pre-compiler to make styling easier
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
- [Heroku]() - For deployment and hosted database
- [Circle CI]() - Continuous integration platform
- [Parcel]() - Webpack but without the config

## Contributing

1. Fork it (<https://github.com/bryce-mcmath/scheduler/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR

## Meta

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – bryce.j.mcmath@gmail.com

## Known issues / bugs

- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/bryce-mcmath/scheduler/issues)_

## Feature roadmap

### In the works

-

### Planned

-

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

-
