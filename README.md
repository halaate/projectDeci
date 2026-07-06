# E-Commerce API

## Description

This project is an E-Commerce REST API built using Node.js, Express.js, MongoDB, and Mongoose. It provides APIs for managing categories, products, carts, and orders.

## Features

- Categories CRUD
- Products CRUD
- Product filtering
- Cart management
- Order checkout
- MongoDB database

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

Clone the repository:

```bash
git clone https://github.com/halaate/projectDeci.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
PORT=3000
```

Seed the database:

```bash
npm run seed
```

Run the project:

```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URI | MongoDB connection string |
| PORT | Server port |

## API Endpoints

### Categories

| Method | Endpoint |
|--------|----------|
| GET | /api/categories |
| GET | /api/categories/:id |
| POST | /api/categories |
| PATCH | /api/categories/:id |
| DELETE | /api/categories/:id |

### Products

| Method | Endpoint |
|--------|----------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PATCH | /api/products/:id |
| DELETE | /api/products/:id |

### Cart

| Method | Endpoint |
|--------|----------|
| GET | /api/cart |
| POST | /api/cart/add |
| PATCH | /api/cart/:id |
| DELETE | /api/cart/:id |
| DELETE | /api/cart |

### Orders

| Method | Endpoint |
|--------|----------|
| GET | /api/orders |
| GET | /api/orders/:id |
| POST | /api/orders |
| PATCH | /api/orders/:id |

## Project Structure

```
config/
controllers/
middleware/
models/
routes/
seed/
utils/
app.js
package.json
README.md
```