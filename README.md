# vicdevs

> Small social media site for developers in Victoria, BC

<!-- Badges -->

![build status](https://codebuild.us-east-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicnYxK01oa1kzY210dUlyZE1mRVVpMWJ2M09LZm9ZTTNjTFZueEFNczNVaUpEY05tUFhPSSt2SUV4Y0RTT3JPZW1TeURXeTk5MXdoejlFWC9jRVJmUzdBPSIsIml2UGFyYW1ldGVyU3BlYyI6IlpSRnBtTjMraEpDcld6Y1YiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

vicdevs.io is a fullstack CRUD app made to help connect developers in Victoria. Registered users can create a profile with their skills, education, and work experience, create posts, view others' posts and profiles, comment on posts, and like posts and comments. Most of it is made with Node.js, express, MongoDB, Sass, Redux, and modern React including custom hooks and reducers.

To learn more and see it in action, read further. Or visit it [(live)](http://vicdevs-env.eba-pyqd2qvb.us-east-2.elasticbeanstalk.com/)

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

### Installing and Setup

First, clone this repository. Then install dependencies with `npm i` in both the root and then `npm run lerna-install`.

Second, create a free MongoDB Atlas database instance [here](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)

Third, get a GitHub client secret and id by registering an OAuth app [here](https://github.com/settings/developers)

Lastly, add a default.json file in /config following the provided default.example.json file

## Available Scripts

### In the root

Build the client and server:

```sh
npm run build
```

Start the server (renders static client files):

```sh
npm run start
```

Hot reload server for development:

```sh
npm run dev
```

This will run both client and server tests when I have some:

```sh
npm run test
```

### In /client

Hot reload server for development:

```sh
npm run serve
```

## Running the Tests

One day.

## Built with

- [React]() - Front-end framework
- [axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Sass](https://sass-lang.com/) - CSS pre-compiler to make styling easier
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node

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

- Responsiveness/restyle
- Add comment liking UI
- Switch likes to a toggle, rather than thumbs up + thumbs down
- CI/CD setup

### Planned

- Tests

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

- It does indeed look very bad rn but it works
