<!-- # TMDB

## Local
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/health

## Setup
### Server
```bash
cd server
npm run dev

cd client
npm run dev -- --host 0.0.0.0

cd tests
npm test
``` -->

# Movie Recommendation System (TMDB)

A full-stack **MERN** web application that allows users to search movies using the TMDB API, save personalized favorites, and manage their collection. The app uses **Google OAuth** for authentication, **MongoDB** for persistence, and is fully deployed on **Google App Engine**.

This project demonstrates modern full-stack development practices including authentication, state management, external API integration, automated testing, containerized development, and cloud deployment.

---

## Live Links

- **Frontend (React UI):**  
  https://acoustic-realm-481308-i5.appspot.com

- **Backend (Express API):**  
  https://acoustic-realm-481308-i5.appspot.com/api

- **Video Demo:**  
  👉 *(paste your video link here — Panopto, YouTube (unlisted), or Google Drive)*

---

## Tech Stack

- **Frontend:** React (Vite), Context API, useReducer, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (MongoDB Atlas)
- **Auth:** Google OAuth 2.0
- **External API:** TMDB (The Movie Database)
- **Testing:** Playwright (end-to-end)
- **Deployment:** Google App Engine
- **Dev Environment:** VS Code Dev Containers + Docker

---

## Features

- Google OAuth login
- Search movies via TMDB API
- Save, view, update, and delete favorites (CRUD)
- Personalized user dashboard
- Protected routes for authenticated users
- Animated UI elements
- Fully deployed & publicly accessible


---

## How to Run Locally (Dev Container)

### 1. Open in Dev Container
- Open the project folder in VS Code
- Select **“Reopen in Container”**

This automatically starts:
- Node.js environment
- MongoDB (via docker-compose)

---

### 2. Environment Variables (Local)

Create `server/.env`:

MONGODB_URI=mongodb://db:27017/tmdbapp
TMDB_API_KEY=your_tmdb_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
JWT_SECRET=dev_secret

---

### 3. Run the Backend

```bash
cd server
npm install
npm run dev
```

### 4. Run the Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

---

## Automated Testing (Playwright)

### How to Run Tests

```bash
npm install
npm test
```

---

## Design Artifact (Architecture & Flow)

### Authentication Flow
User → Google OAuth → Client
Client → Backend (/api/auth/google)
Backend → Google token verification
Backend → JWT issued
Client → Authenticated state (Context)

### Favorites CRUD Flow
Client → /api/favorites (JWT protected)
Backend → Mongoose Model
MongoDB Atlas → Persisted data

### Design Patterns Used
1. Context + Reducer Pattern for global auth state
2. MVC-style separation in backend (routes / models / middleware)
3. Proxy API pattern (TMDB accessed via backend)

---

## Attribution & Sources

TMDB API: https://www.themoviedb.org/

Google OAuth: https://developers.google.com/identity

Playwright: https://playwright.dev/

MongoDB Atlas: https://www.mongodb.com/atlas

Dev Containers: https://containers.dev/

ChatGPT: https://chatgpt.com/

Mermaid Diagram: https://docs.mermaidchart.com/mermaid-oss/syntax/sequenceDiagram.html#grouping-box/