# User Management System

A clean-architecture, TypeScript-based user management system using Express, Mongoose, and Dependency Injection.

## Features
- 3-layer architecture: Controller, Service, Repository
- MongoDB with Mongoose
- TypeScript with strict types
- Dependency Injection (tsyringe)
- Clean, modular structure
- Shadcn/UI for React components (UI layer)

## Project Structure
```
src/
  controllers/
  services/
  repositories/
  models/
  types/
  di/
  index.ts
```

## Scripts
- `npm run dev` — Start in development mode
- `npm run build` — Compile TypeScript
- `npm start` — Run compiled app

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/userdb
   PORT=3000
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

## Clean Architecture
- **Controllers**: Express route handlers, no business logic
- **Services**: Business logic, validation, orchestration
- **Repositories**: Data access, Mongoose models
- **Types/Models**: TypeScript types, Mongoose schemas
- **DI**: Dependency injection setup

---
UI (Shadcn/UI) is scaffolded for future integration. 