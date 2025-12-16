# Dynamic Portal

Dynamic Portal is a **full-stack web application** built with a modern TypeScript stack:

- **Frontend** – React 18, Vite, Ant Design 5, Redux Toolkit, React-Query, Tailwind CSS
- **Backend** – Node.js, Express, TypeScript, MongoDB, Socket.IO, JWT auth

The project is split into two repositories that live side-by-side on your machine:

| Layer    | Git URL                                                   | Local folder              |
| -------- | --------------------------------------------------------- | ------------------------- |
| Frontend | `https://github.com/sabi-hawk/dynamic-portal.git`         | `dynamic-portal/`         |
| Backend  | `https://github.com/sabi-hawk/dynamic-portal-backend.git` | `dynamic-portal-backend/` |

---

## 1. Prerequisites

1. **Node.js ≥ 18** (check with `node -v`)
2. **npm ≥ 9** (comes with Node – check with `npm -v`)
3. **MongoDB** running locally or a connection string to a remote cluster

> 📦 Both workspaces use plain npm – you don’t need Yarn or PNPM unless you prefer them.

---

## 2. Clone the repositories

```bash
# ① Clone the frontend
git clone https://github.com/sabi-hawk/dynamic-portal.git

# ② Clone the backend (sibling folder)
git clone https://github.com/sabi-hawk/dynamic-portal-backend.git
```

Your directory tree should now look like this:

```
📂 your-workspace/
 ├─ dynamic-portal/            # React frontend
 └─ dynamic-portal-backend/    # Express backend
```

---

## 3. Install dependencies

```bash
# Frontend deps
cd dynamic-portal
npm install

# Backend deps
cd ../dynamic-portal-backend
npm install
```

---

## 4. Configure environment variables

### 4.1 Backend

Create a `.env` file inside `dynamic-portal-backend/` (there is an example in the repo). Minimum required keys:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dynamic-portal
JWT_SECRET=super-secret-string
```

### 4.2 Frontend

If the frontend needs to know the API base URL you can add a `.env` file in `dynamic-portal/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ Every variable **must start with `REACT_APP_`** so that Create React App can expose it to the browser.

---

## 5. Running in development

Open **two terminal tabs** – one for each layer.

### 5.1 Backend

```bash
cd dynamic-portal-backend
npm run dev:server           # nodemon + ts-node (default port 5000)
```

### 5.2 Frontend

```bash
cd dynamic-portal
npm start                    # CRA dev-server on port 3000
```

Now visit <http://localhost:3000> – the React app will proxy API requests to <http://localhost:5000>.

---

### 5.3 Optional: run both with `concurrently`

Install globally (or add to one repo):

```bash
npm install -g concurrently
```

Then from the project root you can run:

```bash
concurrently "npm --prefix dynamic-portal-backend run dev:server" "npm --prefix dynamic-portal start"
```

---

## 6. Production build

```bash
# Build optimised static assets
cd dynamic-portal
npm run build                # output ⇒ build/
```

Serve the generated `build/` folder with **NGINX**, **serve**, or any static hosting of your choice.  
Make sure the backend is reachable under the same domain or adjust `REACT_APP_API_URL` accordingly.

---

## 7. Project scripts reference

| Location                  | Script               | Purpose                              |
| ------------------------- | -------------------- | ------------------------------------ |
| `dynamic-portal/`         | `npm start`          | Launch CRA dev server (hot-reload)   |
|                           | `npm run build`      | Bundle React for production          |
|                           | `npm test`           | Jest test runner                     |
| `dynamic-portal-backend/` | `npm run dev:server` | Nodemon + ts-node live-reload server |

|

---

## 8. Tech stack details

- **React 18 + TypeScript** – component based UI
- **Ant Design 5** – ready-made UI widgets and charts
- **Redux Toolkit & React-Query** – state management & server cache
- **Tailwind CSS** – utility-first styling
- **Express.js** – REST API, Socket.IO realtime channels
- **MongoDB & Mongoose** – document database layer
- **JWT + Bcrypt** – authentication & password hashing
- **Winston** – centralised logging

---

## 9. Troubleshooting

- "EADDRINUSE" – Something else is already running on the expected port. Change `PORT` or kill the process.
- CORS errors – Ensure the backend sends correct `Access-Control-Allow-Origin` headers. They are enabled via the `cors` package.
- TypeScript type errors – run `npm run build` or `tsc --noEmit` to get a full report.

---

## 10. License

This project is licensed under the MIT License – see the `LICENSE` file for details.
