## How to Run the System (Docker)


### 1. Clone the repository

```bash
git clone https://github.com/Sorasit-Kateratorn/digital-library.git
cd digital-library
```

### 2. Configure environment variables

Create a `.env` file inside the `backend` folder.

Example:

```env
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

This API key is required for loading initial book data from Google Books API.

Follow this guide to create your API key:  
[Google Cloud Console - Create API Key](https://docs.google.com/document/d/15tecctQwQR5GLkYLmpQJ-AHTs1lfXhIG7o2U6oao5Ls/edit?usp=sharing)

> **Important:**
> On the first startup, the backend container will automatically:
>
> * run Django migrations
> * create the SQLite database file
> * attempt to load initial book data using the Google Books API

If the API key is missing or invalid, the backend will still start, but the initial book data may not be loaded.

### 3. Run the application

```bash
docker compose up --build
```

### 4. Access the system

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:8000`





## How to Run the System (Manual)

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

## 4. Configure Environment Variables (API KEY)

Create a `.env` file inside the `backend` folder.

Example:

```env
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

This API key is required for loading initial book data from Google Books API.

Follow this guide to create your API key:  
[Google Cloud Console - Create API Key](https://docs.google.com/document/d/15tecctQwQR5GLkYLmpQJ-AHTs1lfXhIG7o2U6oao5Ls/edit?usp=sharing)

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