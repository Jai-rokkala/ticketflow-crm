# TicketFlow CRM

Modern customer support ticket management system built using React, FastAPI, SQLite, and Tailwind CSS.

---

## Live Deployment

### Frontend

https://ticketflow-crm.vercel.app/

### Backend API

https://ticketflow-crm-production.up.railway.app/

### Swagger API Docs

https://ticketflow-crm-production.up.railway.app/docs

---

## Features

* Create support tickets
* View all tickets
* Search tickets instantly
* Filter tickets by status
* View ticket details
* Update ticket status
* Responsive and clean UI

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

---

## Project Structure

```bash id="brj9qx"
ticketflow-crm/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   ├── requirements.txt
│   └── routes/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | /tickets/            | Create ticket        |
| GET    | /tickets/            | Get all tickets      |
| GET    | /tickets/{ticket_id} | Get single ticket    |
| PUT    | /tickets/{ticket_id} | Update ticket status |

---

## Backend Setup

```bash id="6fy2uy"
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash id="3s5iyk"
http://127.0.0.1:8000
```

Swagger Docs:

```bash id="ccq8jq"
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash id="8a7qtw"
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash id="ghjk4f"
http://localhost:5173
```

---

## Deployment

### Frontend

Deployed on Vercel

### Backend

Deployed on Railway

---

## Future Improvements

* Authentication system
* Ticket priority levels
* Pagination
* Dashboard analytics
* Email notifications

---

## Author

Jai Rokkala
