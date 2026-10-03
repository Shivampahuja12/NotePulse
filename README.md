# NotePulse — Fullstack Mobile Notes Application

A fullstack mobile-first Notes application built with **React SPA** on the frontend and an **Express.js / MongoDB REST API** on the backend. Designed with a warm minimalist aesthetic (`#FAF7F2` cream background, `#FF5500` orange accents, and clean *Plus Jakarta Sans* typography).

---

## 📱 Features

- **Mobile App Design**: Styled specifically for mobile screens with a fixed-height frame preview on desktop viewports.
- **Stable Mobile UI**: Fixed vertical height layout ensuring the container never shrinks or collapses when searching or displaying empty states.
- **Real-Time Note Search**: Instant search filtering as you type across note titles and descriptions.
- **Note Management (CRUD)**:
  - **Create**: Slide-in full screen editor page to add new notes.
  - **Read**: View notes feed with title, body snippet, timestamp, and active orange status indicator.
  - **Update**: Edit note descriptions via slide-in editor.
  - **Delete**: Remove notes with dropdown context menu action.
- **Character Counter**: Live character count (`0 / 500`) in the note editor.

---

## 📁 Repository Structure

```text
notes-api/
├── backend/                  # Node.js & Express REST API
│   ├── src/
│   │   ├── config/           # Database connection logic
│   │   │   └── db.js
│   │   ├── controllers/      # Route request handlers
│   │   │   └── note.controller.js
│   │   ├── models/           # Mongoose Data Models
│   │   │   └── note.model.js
│   │   ├── routes/           # Express Endpoint Routes
│   │   │   └── note.route.js
│   │   └── app.js            # Express app configuration & middleware
│   ├── .env                  # Backend environment variables
│   ├── .gitignore            # Backend gitignore rules
│   ├── package.json          # Backend dependencies & scripts
│   └── server.js             # API Server entry point
│
├── frontend/                 # Mobile React Single Page App
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── Header.jsx    # "My Notes" top bar & avatar icon
│   │   │   ├── SearchBar.jsx # Search bar input
│   │   │   ├── NoteCard.jsx  # Note item card with 3-dots context menu
│   │   │   └── EditorPage.jsx# Full-screen note creator/editor page
│   │   ├── App.jsx           # App state management & API integration
│   │   ├── index.css         # Warm minimalist mobile CSS design system
│   │   └── main.jsx          # React app entry point
│   ├── index.html            # HTML template with Google Fonts
│   ├── .gitignore            # Frontend gitignore rules
│   └── package.json          # Frontend dependencies & scripts
│
├── .gitignore                # Project root gitignore rules
├── package.json              # Root script runner
└── README.md                 # Project documentation
```

---

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express 5**
- **MongoDB** with **Mongoose 9** ORM
- **CORS** middleware for cross-origin requests
- **Dotenv** for environment variable management
- **Nodemon** for local dev server hot reload

### Frontend
- **React 18** (Vite SPA)
- **Lucide React** (Modern UI icons)
- **CSS3** (Custom design tokens, flexbox/grid layout, smooth animations)
- **Google Fonts** (*Plus Jakarta Sans*)

---

## 🔗 REST API Endpoints

Base API URL: `http://localhost:3000/api/v1`

| HTTP Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/notes` | Retrieve all notes | None |
| `POST` | `/notes` | Create a new note | `{ "title": "String", "description": "String" }` |
| `GET` | `/notes/:id` | Retrieve single note by ID | None |
| `PATCH` | `/notes/:id` | Update note description by ID | `{ "description": "String" }` |
| `DELETE` | `/notes/:id` | Delete note by ID | None |

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Connection String (Local MongoDB or MongoDB Atlas)

---

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd notes-api
```

---

### Step 2: Configure Backend Environment Variables
Create a `.env` file inside the `backend/` directory:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notes_db
PORT=3000
```

---

### Step 3: Install Dependencies

#### Install Backend Dependencies:
```bash
cd /backend
npm install
```

#### Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

---

### Step 4: Run the Application

From the root directory:

#### Run Backend Server (Port 3000):
```bash
npm run dev:backend
```

#### Run Frontend Dev Server (Port 5173):
```bash
npm run dev:frontend
```

Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 🛡️ Git Ignore Configuration

The project contains `.gitignore` files at the root, `backend/`, and `frontend/` levels ensuring that:
- `node_modules/` folder is excluded.
- `.env` environment secret configuration files are kept secure.
- Production build outputs (`dist/`, `build/`) are excluded from repository history.

---

