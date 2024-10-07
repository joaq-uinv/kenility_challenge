<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

Create a `.env` file and add the environment variables provided in the `.env.example` file with your own values

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Examples of available endpoints

`POST /auth/register`

```bash
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "id": "9f78af1b-16e6-43d0-ac6c-413c3b2ebd28",
    "name": "joaquin",
    "lastName": "villanueva"
}'
```

`POST /auth/login`

```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "id": "9f78af1b-16e6-43d0-ac6c-413c3b2ebd28"
}'
```

`GET /users`

```bash
curl --location --globoff 'http://localhost:3000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9hcXVpbiIsImxhc3ROYW1lIjoidmlsbGFudWV2YSIsImFkZHJlc3MiOm51bGwsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0wNlQxODowODoyMS41OThaIiwidXBkYXRlZF9hdCI6IjIwMjQtMTAtMDZUMTg6MDg6MjEuNTk4WiIsImRlbGV0ZWRfYXQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MjgyNDIzMzh9.Hpcnx82Vu00JaJ--INdvUDe4WmsYH2WNTaHdDvUmIqw'
```

- to filter by, say, name, add the following query param: `?filters[name]=${name}`

`POST /users`

```bash
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9hcXVpbiIsImxhc3ROYW1lIjoidmlsbGFudWV2YSIsImFkZHJlc3MiOm51bGwsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0wNlQxODowODoyMS41OThaIiwidXBkYXRlZF9hdCI6IjIwMjQtMTAtMDZUMTg6MDg6MjEuNTk4WiIsImRlbGV0ZWRfYXQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MjgyNDIzMzh9.Hpcnx82Vu00JaJ--INdvUDe4WmsYH2WNTaHdDvUmIqw' \
--data '{
    "name": "joaquin",
    "lastName": "villanueva"
}'
```

`PUT /users/:id`

```bash
curl --location --request PUT 'http://localhost:3000/users/9f78af1b-16e6-43d0-ac6c-413c3b2ebd28' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9hcXVpbiIsImxhc3ROYW1lIjoidmlsbGFudWV2YSIsImFkZHJlc3MiOm51bGwsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0wNlQxODowODoyMS41OThaIiwidXBkYXRlZF9hdCI6IjIwMjQtMTAtMDZUMTg6MDg6MjEuNTk4WiIsImRlbGV0ZWRfYXQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MjgyNDIzMzh9.Hpcnx82Vu00JaJ--INdvUDe4WmsYH2WNTaHdDvUmIqw' \
--data '{
    "name": "Joaquin"
}'
```

`POST /users/:id/image`

```bash
curl --location 'http://localhost:3000/users/9f78af1b-16e6-43d0-ac6c-413c3b2ebd28/image' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9hcXVpbiIsImxhc3ROYW1lIjoidmlsbGFudWV2YSIsImFkZHJlc3MiOm51bGwsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0wNlQxODowODoyMS41OThaIiwidXBkYXRlZF9hdCI6IjIwMjQtMTAtMDZUMTg6MDg6MjEuNTk4WiIsImRlbGV0ZWRfYXQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE3MjgyNDIzMzh9.Hpcnx82Vu00JaJ--INdvUDe4WmsYH2WNTaHdDvUmIqw' \
--form 'image=@"/home/joaquin/Pictures/Screenshots/Screenshot from 2024-10-05 11-20-13.png"'
```
