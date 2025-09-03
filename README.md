# Thoughts

A Twitter (X) / Facebook clone named "thoughts", which focuses on close relationships between people and sharing thoughts.

## Getting Started

This is a simple guide on how to get setup up and start the development.

### Prerequisites

- Docker (Docker Desktop)
- Node v22
  - PNPM 9.x.x

### Environment Variables:

These are the environment variables you need to add to the `.env` file in the project root.
With these environment variables, you can test everything locally.

```shell
# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=thoughts

# Website
VITE_API_BASE_URL=http://127.0.0.1:3000/api
VITE_ASSETS_BASE_URL=http://127.0.0.1:8000

# API
WEBSITE_BASE_URL=http://127.0.0.1:5173
JWT_PRIVATE_KEY= # Generate random string
PASSWORD_SALT= # Generate random string
UPLOADS_FILE_PATH=../.docker/assets
```
