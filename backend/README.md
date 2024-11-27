# Backend API Documentation

## Overview

This documentation provides an overview of the API endpoints available in the backend. The API allows users to register and login.

## Endpoints

### Register a New User

**URL**: `/users/register`

**Method**: `POST`

**Summary**: Register a new user

**Tags**: [Users]

**Request Body**:

- `fullName` (object, required): The full name of the user
  - `firstName` (string, required): The first name of the user (example: "John")
  - `lastName` (string, optional): The last name of the user (example: "Doe")
- `username` (string, required): The username of the user (example: "johndoe")
- `email` (string, required): The email of the user (example: "johndoe@example.com")
- `password` (string, required): The password of the user (example: "password123")

**Responses**:

- `201 Created`:
  - Description: User created successfully
  - Content:
    ```json
    {
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "username": "johndoe",
        "email": "johndoe@example.com",
        "creditPoints": 0,
        "profileImage": null,
        "userLevel": 1,
        "createdAt": "2021-06-22T19:44:15.000Z",
        "updatedAt": "2021-06-22T19:44:15.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- `400 Bad Request`:
  - Description: Validation error
  - Content:
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 2 characters long",
          "param": "fullName.firstName",
          "location": "body"
        }
      ]
    }
    ```
- `409 Conflict`:
  - Description: Email already exists
  - Content:
    ```json
    {
      "error": "Email already exists"
    }
    ```
- `409 Conflict`:
  - Description: Username already exists
  - Content:
    ```json
    {
      "error": "Username already exists"
    }
    ```
  ```

  ```
- `500 Internal Server Error`:
  - Description: Internal server error
  - Content:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### Login a User

**URL**: `/users/login`

**Method**: `POST`

**Summary**: Login a user

**Tags**: [Users]

**Request Body**:

- `email` (string, required): The email of the user (example: "johndoe@example.com")
- `password` (string, required): The password of the user (example: "password123")

**Responses**:

- `200 OK`:
  - Description: User logged in successfully
  - Content:
    ```json
    {
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "username": "johndoe",
        "email": "johndoe@example.com",
        "creditPoints": 0,
        "profileImage": null,
        "userLevel": 1,
        "createdAt": "2021-06-22T19:44:15.000Z",
        "updatedAt": "2021-06-22T19:44:15.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- `400 Bad Request`:
  - Description: Validation error
  - Content:
    ```json
    {
      "errors": [
        {
          "msg": "Please provide a valid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
- `401 Unauthorized`:
  - Description: Invalid email or password
  - Content:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```
- `500 Internal Server Error`:
  - Description: Internal server error
  - Content:
    ```json
    {
      "error": "Internal server error"
    }
    ```

## License

This project is licensed under the MIT License.
