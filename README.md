# News Aggregator API

A RESTful API built with Node.js and Express that allows users to manage their news preferences and receive personal news feeds. Users can register, log in, and customize categories like 'technology', 'sports', or 'politics' to get curated news articles via NewsAPI.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JWT (JSON Web Tokens) and password hashing with `bcrypt`.
- **Preference Management**: Personalized categories for each user, allowing for a customized news experience.
- **News Integration**: Real-time news fetching using the NewsAPI service, intelligently filtering articles based on user interests.
- **Middleware Security**: Custom validation for request bodies and authentication middleware to protect sensitive endpoints.
- **Input Validation**: Ensures that all required fields are present and correctly formatted for user registration and updates.

## 🛠️ Project Structure & Tech Stack

The project is structured with a modular approach, separating concerns into routes, models, and middleware:

- **Framework**: Express.js for routing and request handling.
- **Authentication**: `jsonwebtoken` (JWT) for secure, stateless user sessions.
- **Security**: `bcrypt` for one-way password hashing.
- **External Integration**: `axios` for making asynchronous requests to the NewsAPI.
- **Environment Management**: `dotenv` for handling secure configuration like API keys.

## 🔌 API Endpoints

### User Authentication
- `POST /users/signup`: Registers a new user with name, email, password, and initial news preferences.
- `POST /users/login`: Validates credentials and returns a Bearer Token for authenticated access.

### User Preferences (Protected)
- `GET /users/preferences`: Retrieves the current user's saved news categories.
- `PUT /users/preferences`: Allows users to update their list of news interests.

### News Retrieval (Protected)
- `GET /news`: Fetches and displays the latest news articles that match the user's saved preferences.

---
*Created as part of the Airtribe Backend Engineering Launchpad.*
