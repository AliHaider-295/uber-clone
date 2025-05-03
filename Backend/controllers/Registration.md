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
