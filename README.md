# 0 to Shipped Resume Parser

A React and Express application for comparing a text-based resume PDF with a job description. The current comparison is a transparent keyword-matching prototype; AI analysis can be added later.

The PDF is parsed in memory and is not stored. MongoDB stores only the comparison score, matched skills, missing skills, and record timestamps. Job descriptions and extracted resume text are not persisted. PDF uploads are limited to 4 MB to fit Vercel's serverless request-body limit.

## Prerequisites

- Node.js 20 or newer
- MongoDB running locally or a MongoDB connection URI

## Run locally

1. Install the project dependencies from the repository root:

   ```sh
   npm install
   ```

2. Configure the API: copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` to your MongoDB connection string.

3. Start the API in one terminal:

   ```sh
   cd backend
   npm run dev
   ```

4. Start Vite from the repository root in another terminal:

   ```sh
   cd frontend
   npm run dev
   ```

Open the local URL printed by Vite. Its `/api` requests are proxied to the Express server on port 5000.

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel with the repository root as the project root.
2. Add `MONGODB_URI` as a Vercel environment variable for the deployment environments you plan to use. Use a newly rotated Atlas database password; do not commit the value or put it in `vercel.json`.
3. Deploy. Vercel uses the root workspace manifest, builds the Vite app, and routes `/api/*` to the Express serverless function.
4. Verify `https://<your-deployment>/api/health` returns `{"status":"ok","database":"connected"}`.

The Vercel function uses the same-origin API, so no separate frontend API URL or CORS configuration is needed.

## Verify locally

```sh
npm test
npm start --workspace backend
```

Set `MONGODB_URI` in `backend/.env` before starting the local API. Build the frontend with:

```sh
npm run build
```

The API refuses to start without `MONGODB_URI`; it does not silently fall back to in-memory storage.
