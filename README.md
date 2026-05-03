# SunCart - Summer Essentials Store

SunCart is a modern summer eCommerce platform where users can browse seasonal products, view detailed information, and place orders after authentication.

## Live URL

Add your deployed link here after hosting:

- Live Site: `https://your-live-url.vercel.app`
- Repository: `https://github.com/your-username/your-repo`

## Purpose

This project is built for a summer-themed assignment with authentication, protected product details, user profile management, and a responsive shopping experience using Next.js App Router.

## Key Features

- Responsive layout with persistent `Navbar` and `Footer`
- Product listing and detailed product pages from JSON data
- Protected product details route with login redirect and return
- BetterAuth email/password login and registration
- Google social login using BetterAuth provider
- My Profile page with user name, email, and photo
- Update profile information (name and photo URL)
- Summer home page sections: Hero, Popular Products, Summer Care Tips, Top Brands
- Lottie-based animated section using `@lottiefiles/dotlottie-web`

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- DaisyUI
- BetterAuth
- MongoDB
- React Toastify

## NPM Packages Used

- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `tailwindcss`
- `daisyui`
- `react-toastify`
- `@lottiefiles/dotlottie-web`

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required variables:

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `MONGO_URI`
- `MONGODB_DATABASE`
- `MONGO_URI_EMBEDDED`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment Notes

- Deploy on Vercel or Render
- Configure all environment variables in deployment settings
- Since this is Next.js App Router, route reloading works without SPA fallback issues
- Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to your live domain after deploy
