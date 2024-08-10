# Stripe Payment Integration
This project demonstrates a simple Stripe payment integration using React for the frontend and Express for the backend. It allows users to manually enter the payment amount,
process the payment through Stripe, and receive success or failure notifications.

## Features
- User-Friendly Interface: Built with React and Tailwind CSS for a modern, responsive design.
- Manual Payment Amount: Users can enter any amount they wish to pay.
- Stripe Integration: Secure payment processing through Stripe.
- Success and Failure Handling: Displays a success popup on payment success and redirects to a 404 page on failure.
- Webhooks: Stripe webhooks are used to handle events like successful payments.
  
## Installation
Prerequisites
Node.js (v14 or above)
NPM or Yarn
A Stripe account with API keys

## Backend Setup
Clone the repository:
```
git clone "clone link"
```

Navigate to the backend directory:
```
cd stripe-backend
```

Install dependencies:
```
npm install
```

Set up environment variables:

Create a .env file in the backend directory and add your Stripe secret key:
```
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
PORT = 5000
```

Run the backend server:
```
npm run dev
```

The backend will run on http://localhost:5000.

## Frontend Setup

Navigate to the frontend directory:
```
cd stripe-frontend
```

Install dependencies:
```
npm install
```

Set up environment variables:

Create a .env file in the frontend directory and add your Stripe publishable key:
```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Run the frontend server:
```
npm run dev
```
The frontend will run on http://localhost:5173.

Usage
Open the app in your browser:

Navigate to http://localhost:5173.

## Enter the payment amount and card details:

Use the following test card details to simulate payments:

Card Number: 4242 4242 4242 4242
Expiry Date: Any future date (e.g., 12/34)
CVC: Any 3-digit number (e.g., 123)
Postal Code: Any postal code (e.g., 12345)
Complete the payment:

After entering the details, click "Pay" to process the payment. On success, a success popup will appear.

## Loom Video Demo
Watch the demo of the project on Loom: https://www.loom.com/share/000118736b9a43b9bdfce2c55c0e0c58?sid=84fa8e9b-7962-4b76-bce6-5fee86314ea5



