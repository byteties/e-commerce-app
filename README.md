# 🚀🚀🚀 E-Commerce App 🚀🚀🚀

## 📄 Description

This is an E-Commerce application designed to provide a platform for users to browse products, add them to their cart, and proceed to checkout. The application includes product listing, search functionality, cart management, and basic order placement. It has been built using Angular for the frontend and a backend (NestJS) for handling API requests, with integration to MongoDB for data storage.

## 📄 Technologies Used

- **Frontend**: Angular, TypeScript, Angular Material
- **Backend**: NestJS, TypeScript, HTTP requests and Authentication with basic JWT tokens for secure user sessions.
- **Database**: MongoDB for storing products / cart still store in ram
- **Testing**: Cypress for frontend testing / Jest for backend unit test
- **Styling**: SCSS

## 📝 Assumptions

- The application now uses **MongoDB** as the backend database to store products.
- The backend service is assumed to be running locally on port **3000** by default, and MongoDB is running on port **27017**.
- The application doesn't implement actual payment processing, as the goal is to demonstrate the product browsing and cart management functionality.
- User authentication by JWT token.

### 📝 Features
- **Product Listing**: Displays products with pagination and search functionality.
- **Add to Cart**: Allows users to add products to cart.
- **Cart Management**: Users can view, remove, and update product quantities in cart.
- **Checkout**: Allows users to proceed to a checkout form where they enter their information (name, email, shipping address).

### 📝 Areas of Improvement
- **Real Database Integration**: The cart should be store in db / product data is now stored in **MongoDB**. We can further improve the data storage and retrieval mechanism to optimize for production.
- **Cart feature**: Linking the cart to a specific user via their user ID or another unique identifier. 
- **Database schema**: Implement schema to ensure data consistency and integrity.
- **Seed Data**: Implement seed script and run only one time at first setup.
- **Search feature**: Improve by using advanced search features in MongoDB, or integrate Elasticsearch for better product searching.
- **Image storage**: Consider downloading and storing images in S3 to reduce API traffic.
- **Payment Integration**: No payment system is implemented. This can be integrated with services like Stripe or PayPal.
- **Responsive Design**: Although the app is somewhat responsive, further improvements can be made for better mobile usability.
- **Error Handling**: Add more comprehensive error handling for API calls (e.g., handling server errors or image fetch failures).
- **Rendering UI**: Improve performance of the UI by handling API calls more efficiently.
- **Testing**: Find best practices for Cypress tests and improve the coverage for both frontend and backend.

## 🚀 Getting Started

To run the application locally, follow these steps:

### 1. **Clone the repository**

```bash
git clone https://github.com/byteties/e-commerce-app.git
cd e-commerce-app

## 2. Install dependencies
### Frontend
```bash
cd frontend
npm install
```
### Start Backend (NestJS)
##  2. Run the applications
### Start Backend (NestJS)
```bash
cd backend
docker-compose up --build -d
# The server runs on http://localhost:3000 in docker on background
```

##  3. Run Seed User and Produts at first time
```bash
# call api 
POST http://localhost:3000/users/seed
POST http://localhost:3000/products/seed
```

## 4. Start Frontend (Angular)
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
## follow step `2 and 4`
# new terminal
cd frontend
npm run cypress:run
```
### Run Unit Test for Backend
```bash
cd backend
npm run test
```