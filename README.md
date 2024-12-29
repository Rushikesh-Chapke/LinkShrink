# LinkShrink
A scalable URL shortening service built with Node.js and PostgreSQL. Features include:  User Authentication: Google Sign-In for secure access. Short URL Creation: Generate custom or random short URLs. Advanced Analytics: Track clicks, unique users, devices, OS types, and more. Rate Limiting: Prevent abuse with usage limits.

A scalable and efficient URL shortening service built with Node.js and PostgreSQL, designed to simplify the sharing of long URLs. The application provides advanced analytics, user authentication via Google Sign-In, and Dockerized deployment for cloud scalability.

Features

Sign-In Authentication: Secure user access.
Short URL Creation: Custom or auto-generated short links.

Analytics:
Total clicks and unique users.
Device type and OS breakdown.
Performance over time (e.g., last 7 days).
Rate Limiting: Prevent abuse with usage limits.
Topic-Based Grouping: Organize URLs by categories like acquisition, retention, etc.

Technologies Used
Backend: Node.js, Express.js
Database: PostgreSQL
API testing: Postman

Installation & Setup

Follow these steps to set up the project locally:
Prerequisites
Node.js and npm installed
PostgreSQL database set up
Docker (optional for containerization)

Create a .env file in the root directory and add the following variables:
DATABASE_URL=your_postgresql_connection_string
REDIS_URL=your_redis_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000

API Endpoints
Authentication

POST /api/google-signin: Authenticate users via Google Sign-In.
Short URL Management
POST /api/short: Create a short URL.
GET /api/short/:url: Redirect to the original URL.
GET /api/:alias: Get analytical report

Database Schema
Tables:
Users
id, email, google_id, created_at

URLs
id, long_url, short_url, alias, user_id, topic, created_at

Analytics
id, url_id, timestamp, user_agent, ip_address, os_type, device_type

Future Enhancements
Add custom expiration for short URLs.
Integrate additional third-party analytics tools.
Improve rate-limiting logic for dynamic thresholds.

