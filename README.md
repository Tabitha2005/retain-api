# Retain

A personal expense and budget manager. Record what you spend, set a monthly budget, and see where you stand before the month runs out.

## Live application

| What | Link |
|---|---|
| Web app | https://retain-api-psi.vercel.app |
| API | https://retain-api-w1ma.onrender.com/api |
| API health check | https://retain-api-w1ma.onrender.com/api/health |

The API runs on a free hosting plan that sleeps when idle. The first request after a quiet period can take up to a minute. Open the health check link first to wake it up, then use the app.

### Demo accounts

| Role | Email | Password |
|---|---|---|
| User | t.kuir@alustudent.com | Aluel22qq@@ |
| Admin | alueltabby05@gmail.com | Retain404AluelTabby@@05 |

You can also create your own user account on the Register page. Admin accounts cannot be created from the app. They are created with the seed script.

## Features

### For users
- Sign up, sign in and sign out, with a confirmation after an account is created
- Add, view, edit and delete your own expenses (title, amount, category, payment method, date and optional notes)
- Search by title or notes, filter by category, payment method, date range and amount range, and sort by date or amount
- A paged expense list (10 per page) and a detail page for each expense
- Set a monthly budget and see the amount spent, the amount remaining and a status of within, approaching or over
- A dashboard with total spending for the month, remaining budget, highest expense, spending by category and recent expenses
- A month picker to look at any other month

### For admins
- Create, rename and delete expense categories. Deleting a category moves its expenses to the default "Uncategorized" category, which cannot be renamed or deleted
- Platform insights: registered users, expenses recorded, total value of expenses, expenses recorded this month, total spending per category, the 5 most and 5 least used categories, recently added expenses and recently registered users

### Experience
- A responsive layout from small phones to wide desktops
- Loading, empty and error states, inline form validation, confirmation before deleting, and short success messages

## Budget status

| Status | Rule |
|---|---|
| Within budget | Less than 80% of the monthly budget spent |
| Approaching budget | 80% to 100% spent |
| Over budget | More than 100% spent |

## Technologies

| Area | Tools |
|---|---|
| Frontend | React, TypeScript, Vite, Redux Toolkit, React Router, Axios, Material UI |
| Backend | Node.js, Express, TypeScript, Mongoose |
| Database | MongoDB Atlas |
| Security | JSON Web Tokens, bcryptjs, helmet, express-rate-limit, CORS allow list |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## How the requirements are met

| Requirement | Where |
|---|---|
| Authentication with React Context only (sign up, sign in, sign out, roles, protected routes) | `frontend/src/context/AuthContext.ts`, `AuthProvider.tsx`, `hooks/useAuth.ts`, `components/ProtectedRoute.tsx`, `UserRoute.tsx` |
| Admin routes protected with React Context | `frontend/src/components/AdminRoute.tsx` |
| Filtering, searching and sorting with Redux only | `frontend/src/store/filtersSlice.ts`, `store/index.ts`, `store/hooks.ts` |
| Pagination | Server side in `backend/src/controllers/expenseController.ts`, controls in `frontend/src/components/ExpensePagination.tsx` |
| Users only reach their own data | Every expense and budget query is filtered by the user id from the token |
| Admin only endpoints | `adminOnly` middleware in `backend/src/middleware/auth.ts` |

## Pages

| Route | Who | Page |
|---|---|---|
| `/` | Everyone | Landing page with sign in and register buttons |
| `/login`, `/register` | Everyone | Sign in and create account |
| `/dashboard` | Users | Monthly summary |
| `/expenses` | Users | Search, filter, sort, page, add, edit, delete |
| `/expenses/:id` | Users | Expense details |
| `/budget` | Users | Set and review the monthly budget |
| `/admin` | Admins | Platform insights |
| `/admin/categories` | Admins | Manage categories |

Signed in users who open `/` are sent to their home page. Users who open an admin page, and admins who open a user page, are redirected.

## Project structure

```
retain/
  backend/
    src/
      config/        database connection
      controllers/   auth, expenses, budgets, categories, dashboard, admin
      middleware/    auth (protect, adminOnly) and error handler
      models/        User, Category, Expense, Budget
      routes/        one router per resource
      utils/         month and budget status helpers
      app.ts         express app and middleware
      index.ts       server entry point
      seed.ts        default categories and admin account
  frontend/
    src/
      api/           axios client and API functions
      components/    shared components (landing/ holds the landing page parts)
      context/       authentication context
      hooks/         data and utility hooks
      pages/         route screens
      store/         redux filters
      types/         shared TypeScript types
      utils/         formatting, labels and status styles
    vercel.json      sends every path to the single page app
  README.md
```

## Getting started

### Requirements
- Node.js 20 or newer
- A MongoDB database (a free MongoDB Atlas cluster works)

### 1. Clone

```bash
git clone https://github.com/Tabitha2005/retain-api.git
cd retain-api
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in the values:

| Variable | Meaning |
|---|---|
| `MONGO_URI` | Your MongoDB connection string, with a database name such as `retain` |
| `JWT_SECRET` | A long random string used to sign tokens |
| `CLIENT_URL` | Allowed frontend addresses, separated by commas |
| `PORT` | Port for the API (default 5000) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The admin account created by the seed script |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Create the default categories and the admin account, then start the API:

```bash
npm run seed
npm run dev
```

The API is now at `http://localhost:5000/api`. Check it with `http://localhost:5000/api/health`.

| Script | What it does |
|---|---|
| `npm run dev` | Starts the API with automatic restarts |
| `npm run build` | Compiles TypeScript to `dist` |
| `npm start` | Runs the compiled build |
| `npm run seed` | Creates "Uncategorized", starter categories and the admin account |

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

`frontend/.env` needs one value:

```
VITE_API_URL=http://localhost:5000/api
```

Open `http://localhost:5173`.

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Type checks and creates the production build |

## API reference

All routes start with `/api`. Routes marked "Signed in" need the header `Authorization: Bearer YOUR_TOKEN`, where the token comes from the sign in response. Errors return `{ "message": "..." }` with the status codes 400, 401, 403, 404, 409 or 429.

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create a user account |
| POST | `/auth/login` | Public | Returns a token and the user |
| GET | `/auth/me` | Signed in | The current user |

### Expenses

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/expenses` | Signed in | Your expenses, with filters, sorting and pagination |
| POST | `/expenses` | Signed in | Create an expense |
| GET | `/expenses/:id` | Signed in | One of your expenses |
| PUT | `/expenses/:id` | Signed in | Update one of your expenses |
| DELETE | `/expenses/:id` | Signed in | Delete one of your expenses |

An expense has `title`, `amount`, `category` (a category id), `paymentMethod` (`cash`, `card`, `mobile_money`, `bank_transfer` or `other`), `date` and optional `notes`.

Query options for `GET /expenses`:

| Parameter | Meaning |
|---|---|
| `search` | Text to find in the title or notes |
| `category` | Category id |
| `paymentMethod` | One of the payment methods above |
| `dateFrom`, `dateTo` | Date range, as `YYYY-MM-DD` |
| `minAmount`, `maxAmount` | Amount range |
| `sortBy` | `date` (default) or `amount` |
| `order` | `desc` (default) or `asc` |
| `page` | Page number, starting at 1 |
| `limit` | Items per page, default 10, maximum 50 |

The response looks like this:

```json
{ "items": [], "total": 32, "page": 1, "limit": 10, "totalPages": 4 }
```

Another user's expense is returned as 404, so its existence is not revealed.

### Budgets

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/budgets/:month` | Signed in | Budget, spent, remaining and status for a month such as `2026-10` |
| PUT | `/budgets/:month` | Signed in | Set or update the budget with `{ "amount": 1500 }` |

### Categories

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/categories` | Signed in | All categories |
| POST | `/categories` | Admin | Create a category |
| PUT | `/categories/:id` | Admin | Rename a category |
| DELETE | `/categories/:id` | Admin | Delete a category and move its expenses to Uncategorized |

### Dashboard and admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/dashboard?month=2026-10` | Signed in | Total spent, budget, remaining, status, highest expense, spending by category and recent expenses |
| GET | `/admin/insights` | Admin | Platform wide totals, category rankings, recent expenses and recent users |
| GET | `/health` | Public | Returns `{ "status": "ok" }` |

## Security

- Passwords are hashed with bcrypt and never returned by the API
- Tokens expire after one day
- The user's role is read from the database on every protected request, so a changed or deleted account loses access straight away
- Users can only read and change their own expenses and budgets, and admin endpoints return 403 for everyone else
- The role is never accepted from the register form, so nobody can make themselves an admin
- Failed sign in and register attempts are limited to 20 per 15 minutes for each address
- Request bodies are limited to 10 KB, input types are checked, and security headers are added with helmet
- Cross origin requests are only allowed from the addresses listed in `CLIENT_URL`
- Secrets live in environment variables, and `.env` files are not committed

## Deployment

| Part | Host | Settings |
|---|---|---|
| Database | MongoDB Atlas | Database user with read and write access, network access open to the host |
| Backend | Render web service | Root directory `backend`, build `npm install --include=dev && npm run build`, start `npm start`, environment `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` |
| Frontend | Vercel | Root directory `frontend`, framework Vite, environment `VITE_API_URL` set to the Render API address ending in `/api` |

`CLIENT_URL` on Render must include the Vercel address, for example `https://retain-api-psi.vercel.app`, with no trailing slash. After changing `VITE_API_URL` on Vercel, redeploy so the new value is built in.

## Known limitations

- The sign in token is kept in the browser's local storage. A larger production app would use secure cookies
- The free backend plan sleeps when idle, so the first request can be slow
- Amounts are shown in US dollars. The currency is one constant in `frontend/src/utils/format.ts`
- Automated tests were not required for this assessment and are not included

## Author

Aluel Tabitha Kuir

