# Employee Management System (CRUD Application)

## Overview
This project is a full-stack **Employee Management System** that provides basic CRUD (Create, Read, Update, Delete) operations for managing employee records.  
The application is built using **Next.js** for the frontend and **Django** for the backend, following a clean separation of concerns between client and server.

The system is designed to simulate a real-world internal HR or admin dashboard used for employee data management.

---

## Tech Stack

### Frontend
- Next.js
- React
- HTML / CSS
- REST API integration

### Backend
- Django
- Django REST Framework (DRF)
- SQLite / PostgreSQL (configurable)

---

## Features
- Add new employees
- View list of all employees
- View employee details
- Update employee information
- Delete employee records
- RESTful API architecture
- Clean and modular code structure

---

## Application Architecture
Frontend (Next.js)
|
| REST API (JSON)
|
Backend (Django + DRF)
|
Database


---

## Backend Structure (Django)

- Models for employee data
- Serializers for API data validation
- ViewSets for CRUD operations
- URL routing using REST conventions

Example Employee Fields:
- Employee ID
- Name
- Email
- Department
- Role
- Date of Joining

---

## Frontend Structure (Next.js)

- Pages for:
  - Employee list
  - Add employee
  - Edit employee
- API calls to Django backend
- Reusable UI components
- Client-side routing

---

## API Endpoints (Sample)

| Method | Endpoint | Description |
|------|--------|------------|
| GET | /api/employees/ | Get all employees |
| POST | /api/employees/ | Create new employee |
| GET | /api/employees/{id}/ | Get employee by ID |
| PUT | /api/employees/{id}/ | Update employee |
| DELETE | /api/employees/{id}/ | Delete employee |

---

## How to Run the Project

### Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

