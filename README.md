#  Amalgamic_Assignment

This project provides a secure and user-friendly system for user authentication and credit card management. It allows users to sign up, log in, save basic information, verify their identity with OTP, and securely add and manage their credit cards. The system employs a robust backend with JWT authentication and a React-based frontend for a seamless user experience.

##  Key Features

- **User Authentication:** Secure signup and login functionality with JWT-based authentication.
- **Basic Information Management:** Allows users to save and update their basic information (name, date of birth, address).
- **OTP Verification:** Implements OTP verification to enhance security.
- **Card Management:** Enables users to add and view their credit cards securely.
- **Data Validation:** Includes input validation to ensure data integrity.
- **Secure Password Handling:** Uses bcryptjs for password hashing.
- **Frontend UI:** A responsive React-based user interface.
- **Backend API:** A robust Express.js backend with well-defined API endpoints.

##  Tech Stack

- **Frontend:**
    - React
    - React Hooks (useState, useEffect)
    - SCSS
- **Backend:**
    - Node.js
    - Express.js
- **Database:**
    - MongoDB
    - Mongoose
- **Authentication:**
    - JSON Web Tokens (JWT)
    - bcryptjs
- **Middleware:**
    - cors
- **Build Tools:**
    - Vite
- **Other:**
    - dotenv (for environment variables)
    - fetch API

##  Getting Started / Setup Instructions

### Prerequisites

- Node.js (>=14)
- npm or yarn
- MongoDB installed and running
- Vite

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install server dependencies:**

    ```bash
    cd Server
    npm install  # or yarn install
    ```

3.  **Install client dependencies:**

    ```bash
    cd Client
    npm install # or yarn install
    ```

4.  **Configure environment variables:**

    - Create a `.env` file in both the `Server` and `Client` directories.
    - Add the following environment variables:

    **Server/.env:**

    ```
    PORT=5000
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

    **Client/.env:**

    ```
    VITE_API_URL=http://localhost:5000  # or your backend URL
    ```

    Replace `<your_mongodb_connection_string>` and `<your_jwt_secret>` with your actual MongoDB connection string and a secure secret key for JWT.

### Running Locally

1.  **Start the backend server:**

    ```bash
    cd Server
    npm run dev # or yarn dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd Client
    npm run dev # or yarn dev
    ```

    The frontend application will be accessible at `http://localhost:5173` (or the port specified by Vite).

