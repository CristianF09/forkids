# Build Process Documentation

## Overview
This project now uses a unified build process where the frontend React app is built and served by the backend Express server. This simplifies deployment and ensures the frontend and backend are always in sync.

## Build Process

### 1. Development
- **Frontend**: Runs on `localhost:3000` (React dev server)
- **Backend**: Runs on `localhost:10000` (Express server)
- **Command**: `npm start` (runs both concurrently)

### 2. Production Build
The build process consists of two steps:

1. **Build Frontend**: `npm --prefix frontend run build`
   - Creates optimized production build in `frontend/build/`

2. **Copy to Backend**: `npm run copy-build`
   - Removes old `backend/frontend/` directory
   - Copies `frontend/build/` to `backend/frontend/`

### 3. Complete Build Command
```bash
npm run build
```
This command runs both steps automatically.

## File Structure After Build
```
backend/
├── frontend/          # ← Frontend build files served by Express
│   ├── index.html
│   ├── static/
│   ├── images/
│   └── manifest.webmanifest
├── server.js          # ← Serves frontend from ./frontend
└── ...
```

## Server Configuration
The Express server (`backend/server.js`) is configured to:
- Serve static files from `backend/frontend/`
- Handle SPA routing by serving `index.html` for all non-API routes
- API routes are prefixed with `/api/`

## Deployment
The `render.yaml` is configured for a single service that:
1. Installs all dependencies (root, frontend, backend)
2. Builds the frontend and copies it to backend
3. Starts the backend server which serves both API and frontend

## Environment Variables
Make sure to set these in your deployment environment:
- `STRIPE_SECRET_KEY` (sk_live_...)
- `STRIPE_PUBLISHABLE_KEY` (pk_live_...)
- `STRIPE_WEBHOOK_SECRET` (whsec_...)
- `MONGODB_URI`
- `ZMAIL_USER`
- `ZMAIL_PASS`
- `REACT_APP_API_URL`
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`

## Local Testing
1. Build: `npm run build`
2. Start server: `cd backend && npm start`
3. Visit: `http://localhost:10000` 