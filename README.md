# 🚀🚀🚀 E-Commerce App 🚀🚀🚀

## 📄 Description

This is an E-Commerce application designed to provide a platform for users to browse products, add them to their cart, and proceed to checkout. The application includes product listing, search functionality, cart management, and basic order placement. It has been built using Angular for the frontend and a backend (NestJS) for handling API requests, with integration to external APIs for product image retrieval.

## 📄 Technologies Used

- **Frontend**: Angular, TypeScript, Angular Material
- **Backend**: NestJS, TypeScript, HTTP requests
- **Testing**: Cypress for frontend testing / Jest for backend unit test
- **Styling**: SCSS
- **Database**: Local storage for cart data (can be replaced with a real database in future versions)
- **Image API**: Pexels API for fetching product images

## 📝 Assumptions

- The application assumes the use of **local storage** for managing the cart data. A more persistent solution, like a database, could be implemented for production environments.
- The application doesn't implement actual payment processing, as the goal is to demonstrate the product browsing and cart management functionality.
- The backend service is assumed to be running locally on port **3000** by default.


### 📝 Features
- Product Listing: Displays products with pagination and search functionality.
- Add to Cart: Allows users to add products to their cart.
- Cart Management: Users can view, remove, and update product quantities in their cart.
- Checkout: Allows users to proceed to a checkout form where they enter their information (name, email, shipping address).

### 📝 Areas of Improvement
- Real Database Integration: The cart data is stored in local storage. A more persistent solution like MongoDB or PostgreSQL can be used for production.
    - Database schema: implement schema to ensure user can get cart correctly
- Payment Integration: No payment system is implemented. This can be integrated with services like Stripe or PayPal.
- Authentication: User authentication (login/signup) could be added, along with JWT tokens for secure user sessions.
- Responsive Design: Although the app is somewhat responsive, further improvements can be made for better mobile usability.
- Error Handling: Add more comprehensive error handling for API calls (e.g., handling server errors or image fetch failures).
    - Store image: download image add first time and store in S3 to reduce traffic of api calling to third party
    - Rendering UI: improve some performance about api call with UI interaction 
- Testing: find best practics for cypress test 

## 🚀 Getting Started

To run the application locally, follow these steps:

### 1. **Clone the repository**

```bash
git clone https://github.com/byteties/e-commerce-app.git
cd e-commerce-app
```

## 2. Install dependencies
### Frontend
```bash
cd frontend
npm install
```
### Backend
```bash
cd ../backend
npm install
```

##  3. Run the applications
### Start Backend (NestJS)
```bash
cd backend
npm run start:dev
# The server runs on http://localhost:3000
```
## Start Frontend (Angular)
```bash
# open new terminal
cd frontend
npm run start
# The app runs on http://localhost:4200
```

## 🌐 Usage

- Visit http://localhost:4200
- Login with a test user (see below)
- Browse and search books
- Add or remove favorites
- View your favorites page

#### Example Test User
- Username: `admin`
- Password: `123456`

## 🧪 Testing
### Run Cypress E2E Tests
```bash
# setup test
## should run backend and frontend first
## follow step `3. Run the applications`
# new terminal
cd frontend
npm run cypress:run
```
### Run Unit Test for Backend
```bash
cd backend
npm run test
```