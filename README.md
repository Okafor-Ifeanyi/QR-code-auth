## 3rd Inventories Backend - Develop a Mini School Portal 

# Node.js Express MongoDB CRUD API
Welcome to the Responsive School Portal Website project! This prototype/blueprint aims to provide a platform for checking results, marking attendance, and verifying fees payment. Below are the key features and instructions for the project:

- Three main tabs/buttons on the home page:
1. Mark Attendance
2. Check Results
3. Verify Fees Payment


## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Documentation](#documentation)
- [UML Diagram](#uml-diagram)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- IDE- Vscode or any suitable.
- Node.js and npm installed.
- MongoDB installed and running.
- Postman or a similar tool for API testing.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Okafor-Ifeanyi/QR-code-auth
   ```

2. Change to the project directory:

    ```bash
    cd your-api-repo
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Environment Variables

- Create a .env file in the root directory of your project and add the following environment variables:
    ``` bash
    MONGO_URI= ? your_mongodb_uri_here  
    PORT= ? your_desired_port_here
    JWT_SECRET= ? your_desired_jwt_secret_here
    ```
MONGO_URI=your_mongodb_uri_here  
PORT=your_desired_port_here
JWT_SECRET= your_desired_jwt_secret_here


## API Endpoints
- **Create a new User**:  `POST /api/users/register`

- **Login a new User**:  `POST /api/users/login`

- **Get details of a User by ID**:  `GET /api/users/:id`

- **Update role of a user**:   `PATCH /api/users/:id`

- **Generate QR-Code**:   `PATCH /api/users/generateQRCode`

- **Get all user by Role**:   `PATCH /api/users/all/:role`

- **Sing In Attendance with QR code**:  `POST /api/attendance/signIn`

- **Sing Out Attendance with QR code**:  `POST /api/attendance/signOut`

## Testing
Use Postman or your preferred API testing tool to test the CRUD operations. Here's a sample Postman collection you can import: Postman Collection.
>   [Render Live](https://result-checker-g7zf.onrender.com)

## Documentation
This Docs contains an extensive documentation with the following features
- Standard formats for requests and responses for each endpoint.
- Sample usage of the API, including example requests and expected responses.
- Any known limitations or assumptions made during development.
- Instructions for setting up and deploying the API locally or on a server.
>   [Postman Docs](https://documenter.getpostman.com/view/19026826/2s9YJdUh4D)

## UML Diagram
>   [Diagrams on dbdiagrams.io](https://dbdiagram.io/d/QR-Code-651b4562ffbf5169f0e56d69)

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

> Copyright (c) 2023 Prog BIO