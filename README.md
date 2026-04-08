# Digital Library
Final project for Software Architecture

This project is a full-stack digital library system developed as the final project for the Software Architecture course.

The system is built using:

- **Backend:** Django + Django REST Framework + SQLite
- **Frontend:** React + Vite + Bootstrap

---

## How to Run the System

### 1. Clone the Repository

```bash
git clone https://github.com/Sorasit-Kateratorn/digital-library.git
cd digital-library
````

---

# Backend Setup

Open terminal and go to the backend folder.

```bash
cd backend
```

---

## 2. Create Virtual Environment

```bash
python -m venv .venv
```

Activate the environment.

### Windows

```bash
.venv\Scripts\activate
```

---

## 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

This API key is required for loading initial book data from Google Books API.

---

## 5. Apply Database Migrations

```bash
python manage.py migrate
```

This command creates the database schema based on Django models.

---

## 6. Load Initial Book Data

Run the data loading script to fetch and insert sample books into the database.

```bash
cd scripts
python load-book-data.py
cd ..
```

This step is required before running the frontend so that books are available in the system.

---

## 7. Create Superuser (Optional)

For accessing Django admin panel:

```bash
python manage.py createsuperuser
```

---

## 8. Run Backend Server

```bash
python manage.py runserver
```

Backend will run at:

```text
http://127.0.0.1:8000/
```

---

# Frontend Setup

Open a **new terminal** and go to the frontend folder.

```bash
cd frontend
```

---

## 9. Install Frontend Dependencies

```bash
npm install
```

---

## 10. Run Frontend Server

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173/
```

---

# Important Notes

* Make sure the **backend server is running before starting the frontend**
* Both frontend and backend should run at the same time
* Initial book data must be loaded before using the system

