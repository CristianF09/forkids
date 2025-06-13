# ForKids PDF Store

A modern web application for selling educational PDFs for children.

## Features

- User authentication and authorization
- PDF browsing and preview
- Secure payment processing with Stripe
- Responsive design with Tailwind CSS
- Admin dashboard for content management

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express
- Database: MongoDB
- Payment Processing: Stripe
- Authentication: JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development servers:
   ```bash
   npm start
   ```

This will start both the frontend (port 3000) and backend (port 5000) servers.

## Project Structure

```
forkids-pdf-store/
├── frontend/               # React frontend
│   ├── public/            # Static files
│   └── src/              # React source code
│       ├── components/   # Reusable components
│       ├── pages/       # Page components
│       ├── context/     # React context
│       └── utils/       # Utility functions
├── backend/              # Node.js backend
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── middleware/     # Custom middleware
└── images/             # Image assets
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 