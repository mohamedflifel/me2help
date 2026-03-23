



## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: (odkhel bel cmd lel folder location w run el commands hedhom taw yaatik url copy and paste)
   `npm install`
   `npm install --save-dev @types/react @types/react-dom`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Folder	Why
api/	All fetch/axios calls in one place — easy to swap base URL
context/	Auth state (user + token) shared across all pages
hooks/	useAuth() and useChat() clean up page components
routes/ProtectedRoute.tsx	Redirects unauthenticated users away from /chat
services/	Backend AI call logic separated from controllers
middleware/	JWT check reused across all protected routes