# InstaApp

A simple, clean, and modern social photo-sharing web application built with **Laravel**, **Inertia.js**, **React**, and **Tailwind CSS**.

---

## About the App

**InstaApp** allows users to share photos, write captions, interact with posts through likes and comments, and manage their personal profiles in real-time.

### Key Features

- **Authentication**: User registration, login, and secure session management via Laravel Breeze.
- **Photo Feed**: View community posts and personal dashboard feed.
- **Create Posts**: Upload images with custom captions.
- **Likes & Comments**: Interactive like toggles and real-time comment threads.
- **Profile Management**: Update account details, password, and preferences.

---

## Tech Stack

- **Backend**: [Laravel](https://laravel.com/) (PHP 8.3+)
- **Frontend**: [React 18](https://react.dev/) with [Inertia.js](https://inertiajs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Asset Bundler**: [Vite](https://vitejs.dev/)
- **Database**: [MySQL](https://www.mysql.com/)

---

## Prerequisites

Ensure you have the following installed on your machine:

- **PHP** `>= 8.2` (PHP 8.3 recommended)
- **Composer** `>= 2.0`
- **Node.js** `>= 18.0` & **NPM**
- **MySQL Database Server** (via MySQL CLI, MariaDB, Laragon, XAMPP, etc.)

---

## How to Replicate (Setup Guide)

Follow these steps to run the application locally on your machine:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd instaapp
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Frontend Dependencies
```bash
npm install
```

### 4. Configure Environment Files
Copy `.env.example` to create your local `.env` configuration file:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `copy .env.example .env`)*

Configure your **MySQL database credentials** inside the `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=instaapp
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Setup Database & Storage
Create a new MySQL database named `instaapp` (or matching your `DB_DATABASE` in `.env`):

```sql
CREATE DATABASE instaapp;
```

Run database migrations:
```bash
php artisan migrate
```

Link storage for uploaded media access:
```bash
php artisan storage:link
```

### 7. Run the Development Application
Run both the Laravel backend server and Vite frontend concurrently:
```bash
composer run dev
```

*Alternatively, you can run them in separate terminal windows:*
```bash
# Terminal 1: PHP Server
php artisan serve

# Terminal 2: Vite Dev Server
npm run dev
```

### 8. Access in Browser
Open your browser and navigate to:
```
http://localhost:8000
```

---

## Testing & Production Build

### Run Unit/Feature Tests
```bash
php artisan test
```

### Build Frontend for Production
```bash
npm run build
```

---

## Project Structure

```
instaapp/
├── app/
│   ├── Http/Controllers/  # Controllers (PostController, CommentController, LikeController, etc.)
│   └── Models/            # Eloquent Models (User, Post, Comment, Like)
├── database/              # Migrations, seeders, and factories
├── resources/js/          # React components, pages (Inertia.js), and layouts
├── routes/                # Application routes (web.php, auth.php)
└── storage/               # Uploaded files and application logs
```

---

## License

This project is open-sourced under the [MIT License](LICENSE).
