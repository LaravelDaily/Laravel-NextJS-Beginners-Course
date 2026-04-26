Add login/register/logout functionality using separate project with Laravel API authentication, that uses Sanctum personal access tokens with bearer authentication.

API endpoint for login:
```
curl --request POST \
  --url /api/login \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "email": "user@example.com",
  "password": "string",
  "device_name": "string"
}'
```
Response example:
```
{
  "data": {
    "id": 0,
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "is_admin": true
  },
  "token": "string"
}
```

API endpoint for register:
```
curl --request POST \
  --url /api/register \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "device_name": "string",
  "password_confirmation": "string"
}'
```
Response example:
```
{
  "data": {
    "id": 0,
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "is_admin": true
  },
  "token": "string"
}
```

I noticed in the Next.js form there's Phone field, remove it.

In the payload to login/register, include hardcoded `device_name: "nextjs-frontend"`.

Auth token should be stored in localStorage.

After successful login/register, redirect user to the homepage, and on the top-right, show their name:
- API endpoint `GET /api/user` that will return:
```
{
  "data": {
    "id": 0,
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "is_admin": true
  }
}
```

Also show Logout link/button on the top-right:
- API endpoint:
```
curl --request POST \
  --url /api/logout \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

It should return 204.
And after logout just redirect to the homepage.