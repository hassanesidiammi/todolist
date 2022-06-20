# TodoList app exemple

Technologies:
* PHP (7.4)
* Symfony (5.4.9)
* apiPlatform (2.6)
* React (18), axios, bootstrap..
* Docker, docker compose

# Installation

Clone from github
 `git clone https://github.com/hassanesidiammi/todolist.git`

Edit "docker/.env file" (optional)

Build Docker containers

`docker-compose --env-file docker/.env  up --build`

# Testing

* SSH into php container
 `docker-compose --env-file docker/.env  exec php bash`
* Execute Functional test
`./bin/phpunit`

# Loading tests data

* SSH into php container
 `docker-compose --env-file docker/.env  exec php bash`
* load the fixtures
`php bin/console hautelook:fixtures:load`

# Access api docs and test directly

Open http://localhost:8000/api/docs
![open api](/docs/images/open-api.png)

To test the app, a tocken is needed.

### Generating JWTocken

endpoint: `http://localhost:8000/authentication_token`

data exemple:

```
{
  "username": "jean@exemple.com",
  "password": "password"
}
```

Click "Execute"

![generate tocken](/docs/images/generate-tocken.png)

A tocken is genrated, it can be used like `Bearer {tocken}`
 So the app can be tested

# client app

If docker used, the client should be at `http://localhost:3000/todos`
To login use the email or username from these three users


| email            | username | pass     |
-------------------|----------|----------|
| jean@exemple.com | 	jean    | password |
| luc@exemple.com  | 	luc     | password |
| jack@exemple.com | 	jack    | password |


![client login](/docs/images/client-login.png)

After login the Todo list page is shown

![generate tocken](/docs/images/todos.png)


