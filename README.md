# Blogging Platform Backend

A backend system for a blogging platform supporting user authentication, role-based access control, and public APIs for viewing blogs with search, sorting, and filtering functionalities.

## Features

### User Roles
- **Admin**:
  - Manually created in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user by updating the `isBlocked` property.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- Secure user authentication using JWT.
- Role-based access control to differentiate between admin and user permissions.

### Blog Management
- Create, update, and delete blogs (for logged-in users).
- Public API to view blogs with support for:
  - **Search**: Search blogs by title or content.
  - **Sort**: Sort blogs by fields like `createdAt` or `title`.
  - **Filter**: Filter blogs by author or other parameters.

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EngrMunir/L2A3.git
   cd b4-assignment-3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```


