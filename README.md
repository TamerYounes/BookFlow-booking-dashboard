# BookFlow

BookFlow is a small booking dashboard I built for local service businesses. The idea is simple: a customer can submit a service request, and an admin can log in to manage those requests from a dashboard.

This project was built to practice working with a full-stack setup using Next.js, Supabase, authentication, database actions, and a clean UI.

## Features

- Customer booking form
- Admin login
- Protected admin dashboard
- View submitted booking requests
- Update request status
  - New
  - Contacted
  - Completed

- Delete booking requests
- Basic dashboard stats
- Responsive layout
- Supabase database integration

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Supabase Auth

## Pages

- `/` — Homepage
- `/booking` — Customer booking form
- `/login` — Admin login
- `/admin` — Admin dashboard

## How It Works

Customers submit a request through the booking form. The request is saved in a Supabase table. After logging in, the admin can view all requests, update their status, or delete them.

## Environment Variables

Create a `.env.local` file in the root of the project and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit your real environment variables to GitHub.

## Running the Project Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

## Database Table

The Supabase table is called:

```txt
booking_requests
```

Main fields:

```txt
id
full_name
email
phone
service_type
message
status
created_at
```

## What I Practiced

While building this project, I practiced:

- Creating pages with the Next.js App Router
- Using Supabase as a backend
- Adding authentication with Supabase Auth
- Reading and writing data from a database
- Updating and deleting database records
- Managing form state in React
- Styling pages with Tailwind CSS
- Building a project that is closer to a real business use case

## Future Improvements

Some things I could add later:

- Search and filtering in the admin dashboard
- Email notifications for new requests
- Better role-based admin permissions
- A customer confirmation email
- More detailed request history
- A cleaner mobile dashboard layout
