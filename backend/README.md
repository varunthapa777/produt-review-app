# Backend API Documentation

## Overview

This documentation provides an overview of the API endpoints available in the backend. The API allows users to register and login.

## Endpoints

### Register a New User

**URL**: `/api/users/register`

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
      }
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
  - Description: Username or email already exists
  - Content:
    ```json
    {
      "error": "Username already exists"
    }
    ```
    ```json
    {
      "error": "Email already exists"
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

### Login a User

**URL**: `/api/users/login`

**Method**: `POST`

**Summary**: Login a user

**Tags**: [Users]

**Request Body**:

- `email` (string, optional): The email of the user (example: "johndoe@example.com")

- `username` (string, optional): The username of the user (example: "johndoe")

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
- `401 Unauthorized`:
  - Description: Invalid username or email and password
  - Content:
    ```json
    {
      "error": "Invalid Credentials"
    }
    ```
- 500 Internal Server Error:

- Description: Internal server error
- Content:
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Get User Profile

**URL**: `/api/users/profile`

**Method**: `GET`

**Summary**: Get user profile

**Tags**: [Users]

**Security**: Bearer token

**Responses**:

- `200 OK`:
  - Description: User profile retrieved successfully
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
      }
    }
    ```
- `401 Unauthorized`:

  - Description: Unauthorized
  - Content:
    `json
{
  "error": "Unauthorized"
}
`
    varunthapa777: i want to update user/register endpoint in my readme file refer below doc
    /api/users/register:
    post:
    summary: Register a new user
    tags: - Users
    requestBody:
    required: true
    content:
    application/json:
    schema:
    type: object
    properties:
    fullName:
    type: object
    properties:
    firstName:
    type: string
    example: John
    lastName:
    type: string
    example: Doe
    username:
    type: string
    example: johndoe
    email:
    type: string
    example: johndoe@example.com
    password:
    type: string
    example: password123
    required: - fullName - username - email - password
    responses:
    "201":
    description: User created successfully
    content:
    application/json:
    schema:
    type: object
    properties:
    user:
    type: object
    properties:
    id:
    type: string
    example: 60d0fe4f5311236168a109ca
    fullName:
    type: object
    properties:
    firstName:
    type: string
    example: John
    lastName:
    type: string
    example: Doe
    username:
    type: string
    example: johndoe
    email:
    type: string
    example: johndoe@example.com
    creditPoints:
    type: number
    example: 0
    profileImage:
    type: string
    example: null
    userLevel:
    type: number
    example: 1
    createdAt:
    type: string
    format: date-time
    example: 2021-06-22T19:44:15.000Z
    updatedAt:
    type: string
    format: date-time
    example: 2021-06-22T19:44:15.000Z

                    "400":
                      description: Validation error
                      content:
                        application/json:
                          schema:
                            type: object
                            properties:
                              errors:
                                type: array
                                items:
                                  type: object
                                  properties:
                                    msg:
                                      type: string
                                      example: First name must be at least 2 characters long
                                    param:
                                      type: string
                                      example: fullName.firstName
                                    location:
                                      type: string
                                      example: body
                    "409":
                      description: Username or email already exists
                      content:
                        application/json:
                          schema:
                            oneOf:
                              - type: object
                                properties:
                                  error:
                                    type: string
                                    example: Username already exists
                              - type: object
                                properties:
                                  error:
                                    type: string
                                    example: Email already exists
                    "500":
                      description: Internal server error
                      content:
                        application/json:
                          schema:
                            type: object
                            properties:
                              error:
                                type: string
                                example: Internal server error

Workspace: Still building the workspace index, response may be less accurate.

Here is the updated

user/register

endpoint in your README file:

````markdown
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

-

Description: User created successfully

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
    }
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
  - Description: Username or email already exists
  - Content:
    ```json
    {
      "error": "Username already exists"
    }
    ```
    ```json
    {
      "error": "Email already exists"
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
````

varunthapa777: write readme for this two endpoints
/api/users/login:
post:
summary: Login a user
tags: - Users
requestBody:
required: true
content:
application/json:
schema:
type: object
properties:
email:
type: string
example: johndoe@example.com
username:
type: string
example: johndoe
password:
type: string
example: password123
required: - password
responses:
"200":
description: User logged in successfully
content:
application/json:
schema:
type: object
properties:
user:
type: object
properties:
id:
type: string
example: 60d0fe4f5311236168a109ca
fullName:
type: object
properties:
firstName:
type: string
example: John
lastName:
type: string
example: Doe
username:
type: string
example: johndoe
email:
type: string
example: johndoe@example.com
creditPoints:
type: number
example: 0
profileImage:
type: string
example: null
userLevel:
type: number
example: 1
createdAt:
type: string
format: date-time
example: 2021-06-22T19:44:15.000Z
updatedAt:
type: string
format: date-time
example: 2021-06-22T19:44:15.000Z
token:
type: string
example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

        "401":
          description: Invalid username or email and password
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Invalid Credentials
        "500":
          description: Internal server error
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Internal server error

/api/users/profile:
get:
summary: Get user profile
tags: - Users
security: - bearerAuth: []
responses:
"200":
description: User profile retrieved successfully
content:
application/json:
schema:
type: object
properties:
user:
type: object
properties:
id:
type: string
example: 60d0fe4f5311236168a109ca
fullName:
type: object
properties:
firstName:
type: string
example: John
lastName:
type: string
example: Doe
username:
type: string
example: johndoe
email:
type: string
example: johndoe@example.com
creditPoints:
type: number
example: 0
profileImage:
type: string
example: null
userLevel:
type: number
example: 1
createdAt:
type: string
format: date-time
example: 2021-06-22T19:44:15.000Z
updatedAt:
type: string
format: date-time
example: 2021-06-22T19:44:15.000Z
"401":
description: Unauthorized
content:
application/json:
schema:
type: object
properties:
error:
type: string
example: Unauthorized

Workspace: ### Login a User

**URL**: `/api/users/login`

**Method**: `POST`

**Summary**: Login a user

**Tags**: [Users]

**Request Body**:

-

email

(string, optional): The email of the user (example: "johndoe@example.com")

-

username

(string, optional): The username of the user (example: "johndoe")

-

password

(string, required): The password of the user (example: "password123")

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
- `401 Unauthorized`:
  - Description: Invalid username or email and password
  - Content:
    ```json
    {
      "error": "Invalid Credentials"
    }
    ```
-

500 Internal Server Error

:

- Description: Internal server error
- Content:
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Get User Profile

**URL**: `/api/users/profile`

**Method**: `GET`

**Summary**: Get user profile

**Tags**: [Users]

**Security**: Bearer token

**Responses**:

- `200 OK`:
  - Description: User profile retrieved successfully
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
      }
    }
    ```
- `401 Unauthorized`:
  - Description: Unauthorized
  - Content:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

### Logout User

**URL**: `/api/users/logout`

**Method**: `GET`

**Summary**: Logout user

**Tags**: [Users]

**Security**: Bearer token

**Responses**:

- `200 OK`:
  - Description: User logged out successfully
  - Content:
    ```json
    {
      "message": "Logged out successfully"
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

### Reset Password

**URL**: `/api/users/reset-password`

**Method**: `POST`

**Summary**: Reset password

**Tags**: [Users]

**Request Body**:

- `email` (string, required): The email of the user (example: "johndoe@example.com")

**Responses**:

- `200 OK`:
  - Description: Password reset link sent successfully
  - Content:
    ```json
    {
      "message": "Password reset link sent successfully"
    }
    ```
- `400 Bad Request`:
  - Description: Email is required
  - Content:
    ```json
    {
      "error": "Email is required"
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

### Verify Email

**URL**: `/api/users/verify-email`

**Method**: `POST`

**Summary**: Verify email

**Tags**: [Users]

**Request Body**:

- `email` (string, required): The email of the user (example: "johndoe@example.com")

**Responses**:

- `200 OK`:
  - Description: Email verification link sent successfully
  - Content:
    ```json
    {
      "message": "Email verification link sent successfully"
    }
    ```
- `400 Bad Request`:
  - Description: Email is required
  - Content:
    ```json
    {
      "error": "Email is required"
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

### Verify OTP for Email Verification

**URL**: `/api/users/verify-otp/email`

**Method**: `POST`

**Summary**: Verify OTP for email verification

**Tags**: [Users]

**Request Body**:

- `email` (string, required): The email of the user (example: "johndoe@example.com")
- `otp` (string, required): The OTP for email verification (example: "123456")

**Responses**:

- `200 OK`:
  - Description: Email verified successfully
  - Content:
    ```json
    {
      "message": "Email verified successfully"
    }
    ```
- `400 Bad Request`:
  - Description: All fields are required
  - Content:
    ```json
    {
      "error": "All fields are required"
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

### Verify OTP for Password Reset

**URL**: `/api/users/verify-otp/password`

**Method**: `POST`

**Summary**: Verify OTP for password reset

**Tags**: [Users]

**Request Body**:

- `email` (string, required): The email of the user (example: "johndoe@example.com")
- `otp` (string, required): The OTP for password reset (example: "123456")

**Responses**:

- `200 OK`:
  - Description: OTP verified successfully
  - Content:
    ```json
    {
      "message": "OTP verified successfully",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- `400 Bad Request`:
  - Description: All fields are required
  - Content:
    ```json
    {
      "error": "All fields are required"
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

### Change Password

**URL**: `/api/users/change-password`

**Method**: `PATCH`

**Summary**: Change password

**Tags**: [Users]

**Request Body**:

- `token` (string, required): The token for password reset (example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
- `newPassword` (string, required): The new password (example: "newpassword123")

**Responses**:

- `200 OK`:
  - Description: Password changed successfully
  - Content:
    ```json
    {
      "message": "Password changed successfully"
    }
    ```
- `400 Bad Request`:
  - Description: Validation error
  - Content:
    ```json
    {
      "errors": [
        {
          "msg": "Password must be at least 6 characters long",
          "param": "newPassword",
          "location": "body"
        }
      ]
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
