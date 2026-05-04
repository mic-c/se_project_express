# Deployment Status

## Current Status: Local Development Only

This project is currently configured to run locally. Due to the expiration of Google Cloud Platform free trial credits, the application is not deployed to a remote server at this time.

## Why No Deployment?

- Google Cloud free trial expired
- No alternative hosting budget available currently
- Project fully functional in local development environment

## How to Test This Project

Both the frontend and backend are fully functional when run locally:

### Prerequisites
- Node.js installed
- MongoDB installed and running
- Git installed

### Setup Instructions

1. **Clone both repositories:**
   ```bash
   # Backend
   git clone https://github.com/mic-c/se_project_express.git
   cd se_project_express
   npm install
   
   # Create .env file
   echo "NODE_ENV=development" > .env
   echo "JWT_SECRET=your-secret-key" >> .env
   ```

2. **In a new terminal, clone frontend:**
   ```bash
   git clone https://github.com/mic-c/se_project_react.git
   cd se_project_react
   npm install
   ```

3. **Start MongoDB** (if not already running)

4. **Run backend:**
   ```bash
   cd se_project_express
   npm run dev
   ```
   Backend runs on http://localhost:3001

5. **Run frontend (new terminal):**
   ```bash
   cd se_project_react
   npm run dev
   ```
   Frontend opens automatically in browser

## Features Available Locally

✅ User registration and authentication  
✅ JWT-based authorization  
✅ Add, edit, delete clothing items  
✅ Like/unlike items  
✅ Weather-based clothing recommendations  
✅ Profile management  
✅ MongoDB data persistence  

## Future Deployment Plans

The code is prepared for deployment with:
- Environment-based configuration (development/production)
- Production API URLs configured
- Deploy scripts in package.json

Deployment can be completed when hosting resources become available.
