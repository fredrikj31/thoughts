# Thoughts

A Twitter (X) / Facebook clone named "thoughts", which focuses on close relationships between people and sharing thoughts.

## Getting Started

This is a simple guide on how to get setup up and start the development.

### Prerequisites

- Docker (Docker Desktop)
- Node v22
  - PNPM 9.x.x

### Installation

To get starting developing on this project, you first need to install the packages that the web app and API requires.
The project is structured in a mono-repo kinda way, utilizing NPM/PNPM workspaces, to contain the web app and API.

To install the packages, you need to run the following command in the project root. This will install the packages in both projects.
Make sure you are using Node v22.

```bash
$ pnpm install
```

### Environment Variables

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

### Setting up database & assets web server

The project has two types of containers that needs to run alongside the web application and API. Both of these are running in separate containers in Docker, grouped by a Docker compose file.

1. PostgreSQL database, which is used by the API to store all of it's data in.
2. NGINX web server, used to serve the images (profile & post images) on the web app.

You can spin up these two services in Docker (preferably using Docker Desktop), using this command:

```bash
$ docker compose --profile dev up -d
```

When you want to stop developing, and spin down the containers, you can run this command.

```bash
$ docker compose --profile dev down
```

This persists the data on your local file system in the `.docker` folder in the project root.

### Start developing

When you have installed the packages and started the containers, you can now start the web app and api locally by running these commands:

**API:**

```bash
$ pnpm run api:dev
```

**Web App:**

```bash
$ pnpm run app:dev
```

You can utilize two terminal windows, so run them both at the same time.
These commands are running in _watch_ mode, which means that they are restarting when you make changes to the files.
