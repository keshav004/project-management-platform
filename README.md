# 🚀 Project Management Platform

An enterprise-grade full-stack Project Management Platform built using **ASP.NET Core**, **Angular 20**, **SQL Server**, and **Clean Architecture**. The project demonstrates modern software engineering practices including secure authentication, scalable architecture, RESTful APIs, and enterprise application design.

> 🚧 **Status:** Active Development

---

# 📖 Overview

This project is being developed as a production-style application to showcase enterprise development practices used in modern .NET applications. It focuses on writing clean, maintainable, and scalable code while following SOLID principles and Clean Architecture.

---

# 🏗️ Architecture

The solution follows **Clean Architecture** to ensure separation of concerns and maintainability.

```
ProjectManagement
│
├── ProjectManagement.Api
├── ProjectManagement.Application
├── ProjectManagement.Domain
├── ProjectManagement.Infrastructure
└── ui (Angular 20)
```

---

# 🛠️ Technology Stack

## Backend

- ASP.NET Core 9
- C#
- Entity Framework Core
- SQL Server
- JWT Authentication
- Refresh Token Authentication
- SMTP Email Service
- Swagger / OpenAPI

## Frontend

- Angular 20
- TypeScript
- Angular Router
- Reactive Forms
- HTTP Interceptors
- Standalone Components
- SCSS

## Database

- SQL Server
- Entity Framework Core (Code First)

## Tools

- Git
- GitHub
- Visual Studio 2022
- Visual Studio Code
- Postman
- Swagger

---

# ✨ Implemented Features

## Authentication

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Refresh Token Authentication
- ✅ Logout
- ✅ Remember Me
- ✅ Password Hashing
- ✅ Forgot Password
- ✅ Reset Password
- ✅ SMTP Email Integration

## Frontend

- ✅ Responsive Authentication UI
- ✅ Login Page
- ✅ Register Page
- ✅ Forgot Password Page
- ✅ Reset Password Page
- ✅ Password Strength Validation
- ✅ Confirm Password Validation
- ✅ HTTP Interceptor
- ✅ Route Guards

## Backend

- ✅ REST APIs
- ✅ Clean Architecture
- ✅ Repository Pattern
- ✅ Dependency Injection
- ✅ Entity Framework Core
- ✅ SQL Server Integration
- ✅ Swagger Documentation

---

# 🚧 In Progress

- 🔄 Email Verification
- 🔄 Serilog Logging
- 🔄 Global Exception Handling
- 🔄 Role-Based Authorization
- 🔄 Projects Module
- 🔄 Task Management Module

---

# 📅 Roadmap

## Sprint 1 ✅

- Authentication
- JWT
- Refresh Tokens
- Forgot Password
- Reset Password

## Sprint 2 🚧

- Email Verification
- Logging (Serilog)
- Global Exception Middleware
- Role-Based Authorization

## Sprint 3

- Project Management
- Task Management
- Comments
- File Upload

## Sprint 4

- Notifications
- Dashboard
- Azure Deployment
- CI/CD Pipeline
- Docker

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/keshav004/project-management-platform.git
```

## Backend

```bash
cd api
dotnet restore
dotnet ef database update
dotnet run
```

API will run on:

```
https://localhost:5001
```

Swagger:

```
https://localhost:5001/swagger
```

---

## Frontend

```bash
cd ui
npm install
ng serve
```

Application will run on:

```
http://localhost:4200
```

---

# 📂 Repository Structure

```
project-management-platform
│
├── api
│   ├── ProjectManagement.Api
│   ├── ProjectManagement.Application
│   ├── ProjectManagement.Domain
│   └── ProjectManagement.Infrastructure
│
└── ui
```

---

# 📸 Screenshots

> Screenshots will be added as development progresses.

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

---

# 📄 License

This project is licensed under the MIT License.