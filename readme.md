# Express Rate Limiter using Redis

A simple Express.js rate limiter built with TypeScript and Redis. This project demonstrates how to implement IP-based rate limiting using Redis as a distributed counter store.

## Features

* IP-based request limiting
* Redis-backed request counter
* Configurable request limit and time window
* TypeScript implementation
* Middleware-based integration with Express

## Current Behavior

Only routes under `/api/user` are rate limited.

Example:

```text
/api/user/get   ✅ Rate Limited
/api/health     ❌ Not Rate Limited
/api/products   ❌ Not Rate Limited
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Rate-limitter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create an environment file

Create a file named `.env.development` in the project root:

```env
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
```

Fill in your Redis credentials.

### 4. Start the development server

```bash
npm run dev
```

## Project Structure

```text
src/
├── config/
├── middleware/
├── routes/
├── app.ts
└── index.ts
```

## Configuration

The rate limiter can be configured by modifying the following values:

* **Maximum Requests:** `15`
* **Time Window:** `10 seconds`

## Tech Stack

* TypeScript
* Express.js
* Redis
* ioredis
