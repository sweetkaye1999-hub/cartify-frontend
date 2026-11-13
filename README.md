# Cartify – Product Management System

## Project Overview

Cartify is a React-based Product Management System integrated with a Laravel REST API. It allows users to manage products through a responsive interface using Material UI.

This project was developed for Activity #7: ReactJS Events, State & API Integration.

## Technologies Used

- React.js
- Vite
- Material UI (MUI)
- Axios
- React Router DOM
- Laravel REST API
- MySQL
- PHP

## Features

- Display products from the Laravel API
- View individual product details
- Add new products
- Edit existing products
- Delete products with confirmation
- Search products
- Filter products by category
- Sort products by name and price
- Form validation
- Loading, empty, and error states
- Responsive user interface

## Project Setup

### 1. Backend Setup

Open the Laravel backend folder:

```bash
cd C:\xampp\htdocs\ecommerce-api
```

Install dependencies if needed:

```bash
composer install
```

Start the Laravel development server:

```bash
php artisan serve
```

Backend API URL:

`http://127.0.0.1:8000/api`

Make sure your Laravel environment and MySQL database are configured.

### 2. Frontend Setup

Open another terminal and navigate to the React project:

```bash
cd C:\xampp\htdocs\ecommerce-api\activity6-product-management
```

Install dependencies:

```bash
npm install
```

Create or check the `.env` file in the frontend root folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173/`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieve all products |
| GET | `/products/{id}` | Retrieve a specific product |
| POST | `/products` | Create a product |
| PUT | `/products/{id}` | Update a product |
| DELETE | `/products/{id}` | Delete a product |
| GET | `/categories` | Retrieve product categories |
| POST | `/login` | Authenticate a user |

## Authentication

The application uses a Laravel API Bearer Token for authenticated requests.

The frontend Axios configuration automatically attaches the token stored in browser session storage using the `auth_token` key.

Do not include actual authentication tokens, passwords, or other private credentials in this repository.

## Notes

- The Laravel backend must be running before using the frontend.
- Product information is retrieved and managed through the Laravel API.
- The backend database serves as the source of truth for product records.
- Restart the Vite development server after changing environment variables.