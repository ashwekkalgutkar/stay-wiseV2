# StayWise V2

A full-stack property listing and booking platform inspired by top Indian real estate sites.

## Project Structure

- `/backend` — Node.js, Express, MongoDB API server
- `/frontend` — Next.js 15, React, Tailwind CSS client app
- `/node_modules` (root) — Created if you ran `npm install` in the root folder. Only use `/frontend/node_modules` and `/backend/node_modules` for dependencies.

## How to Run Locally

### Backend

1. `cd backend`
2. `npm install`
3. Set up `.env` with MongoDB URI and JWT secret
4. `npm run dev` (or `npm start` for production)

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev` (Next.js dev server)

## Deployment

- **Frontend:** Deploy `/frontend` to Vercel (auto-detects Next.js)
- **Backend:** Deploy `/backend` to Railway, Render, or Heroku. Set environment variables.
- Update frontend API URLs to point to your backend’s public URL.

## Features

- Property listing, search, filter, infinite scroll
- Property details, booking form
- Authentication (login/signup modal)
- Global loader/spinner
- Modern UI with Tailwind CSS

## Notes

- Remove `/node_modules` in root if not needed. Only install dependencies in `/frontend` and `/backend`.
- For production, set proper environment variables and update API endpoints.

---

For any issues, open an issue or contact the maintainer.
