# Thoughts

A Twitter (X) / Facebook clone named "thoughts", which focuses on close relationships between people and sharing thoughts.

## Getting Started

This is a simple guide on how to get setup up and start the development.

### Prerequisites

- Docker (Docker Desktop)
- Node v20
  - PNPM

### Environment Variables:

```shell
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres # For local development
DB_PASSWORD=password # For local development
DB_NAME=thoughts

# Website
VITE_API_BASE_URL=http://localhost:3000/api

# API
WEBSITE_BASE_URL=http://localhost:5173
JWT_PRIVATE_KEY= # Generate random string
PASSWORD_SALT= # Generate random string
```
