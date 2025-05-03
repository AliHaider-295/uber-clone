# /users/register Endpoint Documentation

## Description

This endpoint is used to register a new user in the system. It validates the user's input and creates a new user account.

## Request Method

`POST`

## Endpoint

`/users/register`

## Request Body

The request body should be a JSON object with the following properties:

```json
{
  "fullname": {
    "firstname": "string", // Required, minimum length: 3 characters
    "lastname": "string" // Optional, minimum length: 3 characters
  },
  "email": "string", // Required, valid email format
  "password": "string" // Required, minimum length: 6 characters
}
```

# /users/register Endpoint Documentation

## Description

This endpoint is used to register a new user in the system. It validates the user's input and creates a new user account.

## Request Method

`POST`

## Endpoint

`/users/register`

## Request Body

The request body should be a JSON object with the following properties:

```json
{
  "fullname": {
    "firstname": "string", // Required, minimum length: 3 characters
    "lastname": "string" // Optional, minimum length: 3 characters
  },
  "email": "string", // Required, valid email format
  "password": "string" // Required, minimum length: 6 characters
}
```

---

# /users/login Endpoint Documentation

## Description

This endpoint allows an existing user to log in by providing their email and password. On successful authentication, it returns a JWT token and user details.

## Request Method

`POST`

## Endpoint

`/users/login`

## Request Body

The request body should be a JSON object with the following properties:

```json
{
  "email": "string", // Required, valid email format
  "password": "string" // Required, minimum length: 6 characters
}
```

## Responses

| Status Code | Description                                     |
| ----------- | ----------------------------------------------- |
| 200         | Login successful. Returns token & user details. |
| 400         | Validation failed. Returns error details.       |
| 401         | Invalid email or password.                      |
| 500         | Internal server error.                          |

### Success Response (`200`)

```json
{
  "token": "jwt_token_string",
  "user": {
    "email": "alice@example.com",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    }
  }
}
```

### Error Response (`400`)

```json
{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Error Response (`401`)

```json
{
  "message": "Invalid email or password"
}
```

### Error Response (`500`)

```json
{
  "message": "Internal Server Error"
}
```
