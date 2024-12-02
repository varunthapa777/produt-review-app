# Backend Server

## Description

This is a Node.js backend server using Express, Mongoose, and other dependencies. It also serves the frontend static files.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd backend
   ```

2. Install backend dependencies:

   ```sh
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:

   ```sh
   cd ../frontend
   npm install
   ```

4. Build the frontend static files:
   ```sh
   npm run build
   ```

## Running the Server

### Development

To run the server in development mode with hot-reloading using `nodemon`:

```sh
npm run dev
```

### Production

To run the server in production mode:

```sh
npm start
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
NODE_ENV=development
MONGO_URI=<your-production-mongodb-uri>
MONGO_URI_TEST=<your-test-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

## API Documentation

For detailed API documentation, visit the `/api-docs` endpoint after running the server.

## License

This project is licensed under the ISC License.
