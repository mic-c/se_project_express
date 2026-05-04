# WTWR (What to Wear?): Back End

The **WTWR** back-end project is focused on creating a server for the WTWR application. This project involves working with databases, setting up security, testing, and deploying web applications on a remote machine. The goal is to create a server with an API and user authorization.

## Links

- **Frontend Repository:** https://github.com/mic-c/se_project_react
- **Backend Repository:** https://github.com/mic-c/se_project_express
- **Deployed Backend API:** (Running locally - no deployment available)
- **Deployed Frontend:** (Running locally - no deployment available)

> **Note:** This project is configured to run locally. To test the full application, clone both repositories and follow the installation instructions below.

## Features

- RESTful API for managing user data and clothing items.
- MongoDB integration for data storage.
- User authentication and authorization.
- Error handling and validation.
- Middleware for request parsing and user mocking.
- Hot reload support for development.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/mic-c/se_project_express.git
   cd se_project_express
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   NODE_ENV=development
   JWT_SECRET=your-secret-key-here
   ```

4. Make sure MongoDB is installed and running on your system

5. Clone and set up the frontend repository:
   ```bash
   git clone https://github.com/mic-c/se_project_react.git
   cd se_project_react
   npm install
   ```

## Running the Project

**Backend:**

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

The backend will run on `http://localhost:3001`

**Frontend (in a separate terminal):**

```bash
cd ../se_project_react
npm run dev
```

The frontend will open automatically in your browser (typically `http://localhost:5173` or `http://localhost:3000`)

## Technology Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- dotenv

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
