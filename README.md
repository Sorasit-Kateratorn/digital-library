# Digital Library
Final project for Software Architecture

This project is a full-stack digital library system developed as the final project for the Software Architecture course.


---

## Project Description

The Digital Library is a web-based reading platform designed to help users organize their personal library and improve their reading experience.

The system solves the problem of users struggling to:
- track their reading progress
- manage books in one place
- discover books that match their interests

Unlike traditional book-selling platforms, this system focuses on **personal reading management**.

---

## System Architecture Overview

This project follows a **Layered Architecture** design.

The system is separated into multiple layers:

- **Presentation Layer**
  - React frontend
  - user interface
  - forms, pages, and navigation

- **Application Layer**
  - Django REST Framework API
  - request handling
  - authentication and business logic

- **Data Access Layer**
  - Django ORM
  - database queries and model relationships

- **Database Layer**
  - SQLite database
  - stores users, books, reviews, and reading progress

Architecture flow:

Frontend → REST API → Service Logic → Database

This architecture improves maintainability, scalability, and separation of concerns.

---

## User Roles & Permissions

### Reader (User)
Permissions:
- register and login
- search books
- add books to personal library
- update reading progress
- rate and review books
- view recommendations

### Admin
Permissions:
- manage users
- manage genres
- manage book catalog
- remove inappropriate reviews
- view reports

### Librarian
Permissions:
- approve or hide reviews
- handle reported content

---

## Core Features

- User registration and authentication
- Add books to personal library
- Track reading progress
- Rate and review books
- Smart recommendation system
- Search and filter by genre
- Admin moderation system

---

## Technology Stack

### Backend
- Django
- Django REST Framework
- SQLite
- JWT Authentication

### Frontend
- React
- Vite
- Bootstrap
- React Router

### External APIs
- Google Books API

---

## Installation & Setup Instructions

For full installation steps, please see [INSTALLATION.md](INSTALLATION.md)

---