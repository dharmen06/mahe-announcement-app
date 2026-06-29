# 📢 Mahe Announcement App

A Shopify embedded app that allows merchants to create and display fully customizable announcement banners on their storefront. The app uses Shopify Metafields for storefront synchronization and provides an embedded admin experience built with React Router v7.

---

## 📸 Screenshots

> Add screenshots inside a `docs/` folder and update the paths below.

### Dashboard

![Dashboard](./docs/dashboard.png)

### Announcement Management

![Announcement Management](./docs/announcement-management.png)

### Storefront Banner

![Storefront Banner](./docs/storefront-banner.png)

---

## ✨ Features

- Create and manage announcement banners
- Customize banner text, colors, and styling
- Enable or disable announcements
- Store announcement data in MongoDB
- Sync banner settings via Shopify Metafields
- Display announcements using a Shopify Theme Extension
- Embedded Shopify Admin experience using Polaris
- Persistent session management using Prisma

---

## 🔄 Architecture Flow

```text
Merchant Dashboard
       ↓
    MongoDB
       ↓
 Shopify Metafields
       ↓
 Theme Extension
       ↓
 Storefront Banner
```

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Deploying to Railway](#-deploying-to-railway)
- [Limitations](#-limitations)

---

## 🛠 Tech Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | React Router v7 (Remix-style)       |
| Shopify SDK     | `@shopify/shopify-app-react-router` |
| Session Storage | Prisma + SQLite                     |
| Database        | MongoDB via Mongoose                |
| Storefront UI   | Shopify Theme Extension             |
| Styling         | CSS Modules + Shopify Polaris       |
| Deployment      | Railway                             |

> **Note:** SQLite is used for local development session storage. For production deployments, PostgreSQL is recommended.

---

## ✅ Prerequisites

Before running the project locally, ensure you have:

- Node.js `>=20.19 <22` or `>=22.12`
- npm `v9+`
- Shopify CLI
- Shopify Partner Account
- Shopify Development Store
- MongoDB (Local or Atlas)

Install Shopify CLI:

```bash
npm install -g @shopify/cli@latest
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
# Shopify
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SCOPES=write_products,write_metaobjects,write_metaobject_definitions
SHOPIFY_APP_URL=https://your-app-url.com

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/mahe-announcement
```

### Where to find each value

| Variable             | Description                                      |
| -------------------- | ------------------------------------------------ |
| `SHOPIFY_API_KEY`    | Shopify Partner Dashboard → App Setup            |
| `SHOPIFY_API_SECRET` | Shopify Partner Dashboard → App Setup            |
| `SCOPES`             | `shopify.app.toml`                               |
| `SHOPIFY_APP_URL`    | Tunnel URL locally or Railway URL in production  |
| `MONGODB_URI`        | Local MongoDB or MongoDB Atlas connection string |

> When running `shopify app dev`, Shopify CLI automatically injects the Shopify environment variables. Only `MONGODB_URI` is required locally.

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mahe-announcement-app.git
cd mahe-announcement-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
MONGODB_URI=mongodb://127.0.0.1:27017/mahe-announcement
```

### 4. Generate Prisma client

```bash
npx prisma generate
npx prisma migrate deploy
```

### 5. Link Shopify app configuration

```bash
npm run config:link
```

### 6. Start development server

```bash
npm run dev
```

Shopify CLI will:

- Create a Cloudflare tunnel
- Generate a public HTTPS URL
- Inject Shopify environment variables
- Enable hot reloading

---

## 🔌 API Endpoints

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/announcement` | Fetch announcement data |
| POST   | `/api/announcement` | Create announcement     |
| PUT    | `/api/announcement` | Update announcement     |
| DELETE | `/api/announcement` | Remove announcement     |

---

## 📁 Project Structure

```text
mahe-announcement-app/
├── app/
│   ├── config/
│   │   └── db.server.js
│   ├── routes/
│   │   ├── _index/
│   │   ├── app._index.jsx
│   │   ├── app.announcement.jsx
│   │   ├── api.announcement.jsx
│   │   ├── auth.login/
│   │   └── webhooks.*.jsx
│   ├── services/
│   │   └── metafield.server.js
│   └── shopify.server.js
├── extensions/
│   └── announcement-banner/
│       └── blocks/
│           └── announcement.liquid
├── prisma/
│   ├── schema.prisma
│   └── dev.sqlite
├── shopify.app.toml
├── Dockerfile
├── package.json
└── README.md
```

---

## ☁️ Deploying to Railway

1. Push your code to GitHub.
2. Create a Railway project.
3. Connect your repository.
4. Add all environment variables.
5. Railway will automatically build and deploy the application.

Production start command:

```bash
npm run docker-start
```

Which runs:

```bash
prisma generate &&
prisma migrate deploy &&
react-router-serve ./build/server/index.js
```

> Ensure `SHOPIFY_APP_URL`, `shopify.app.toml`, and Shopify Partner Dashboard URLs are all identical.

---

## ⚠️ Limitations

- Supports one active announcement banner at a time.
- Requires Theme App Extension installation.
- MongoDB must be accessible.
- SQLite is recommended for development only.

---

## 🎥 Demo

Add your Loom or YouTube demo link here:

```text
https://www.loom.com/share/ba616475d2c84729b5b088ef1d394d2d
```

---

## 🧑‍💻 Author

**Dharam**

Built with ❤️ using Shopify CLI, React Router v7, MongoDB, and Shopify Theme Extensions.

---

## 📄 License

MIT License
