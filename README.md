<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

# Books Shop

## Description

A progressive book shop application built using modern technologies and best practices.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **TypeScript Concepts**:
  - **Sessions**: Managing user sessions.
  - **JWT**: JSON Web Tokens for authentication.
  - **bcrypt**: Secure data encryption.
  - **Passport**: Authentication middleware for Node.js.
  - **.env**: Environment variables management.
  - **Config**: Configuration management.
  - **OAuth2**: OAuth 2.0 authentication.
  - **Security**:
    - **Helmet**: Secure HTTP headers.
    - **CORS**: Cross-Origin Resource Sharing.
    - **Rate Limit**: Rate limiting to prevent abuse.
  - **Serialize and Deserialize**: Handling data serialization and deserialization.

## Features

- User authentication and authorization
- Secure data handling
- Rate limiting to prevent abuse
- Cross-Origin Resource Sharing (CORS) support
- Protection against common security vulnerabilities

## DB Schema
```prisma
model User {
  id    String  @id @default(dbgenerated("gen_random_uuid()"))
  email String  @unique @db.VarChar(255)
  name  String? @db.VarChar(255)
  role  String  @default("user") @db.VarChar(255)
  password String   @db.VarChar(255)    
}
```

## API Routes

### Auth Routes

### Auth Routes

- `POST /api/auth/login`: Login a user.
- `POST /api/auth/register`: Register a new user.
- `GET /api/auth/google/login`: Redirect to Google login.
- `GET /api/auth/google/redirect`: Handle Google login redirect.
- `GET /api/auth/profile`: Get the profile of the logged-in user.

### User Routes

- `GET /api/users`: Get a list of users.
- `GET /api/users/:id`: Get a specific user by ID.
- `PUT /api/users/:id`: Update a specific user by ID.
- `DELETE /api/users/:id`: Delete a specific user by ID.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up the environment variables in the `.env` file.
4. Run the database migrations using `npx prisma migrate dev`.
5. Start the development server using `npm run start:dev`.


## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
# Server configuration
PORT=3000

# Database connection
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# JWT Secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=time_period

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/redirect

# Session
SESSION_SECRET=your_session_secret
```
Replace the placeholder values with your actual configuration details.

## License

This project is licensed under the MIT License.

## Note

This project is still under development.
