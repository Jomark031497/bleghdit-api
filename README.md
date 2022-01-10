# Bleghdit

## A reddit clone I made as a capstone project (not a 1:1 clone of reddit)

## https://bleghdit.site

Built with:

Frontend:

- NextJS (ReactJS)
- Typescript
- Redux-toolkit
- SWR
- Styled with Material-UI v5

Backend:

- NodeJS
- Express
- Typescript
- PostgresSQL
- TypeORM
- Passport Authentication (Local)
- Cloudinary for Image cloud hosting

## Developmnet

clone the repo:

```sh
git clone git@github.com:Jomark031497/bleghdit.git
```

install all packages/library needed:

```sh
npm run install-server && npm run install-client
```

Run the server (run the watch script and the server script):

```sh
npm run watch
# run in seperate terminal
npm run server
```

Run the client:

```sh
npm run client
```

Environment Variables:

Frontend:
Inside the client folder, copy the contents of .env.example and create a .env.local file:

```
NEXT_PUBLIC_SERVER_BASE_URL=<URL OF YOUR SERVER (ex. http://localhost:8080)>
NEXT_PUBLIC_CLIENT_BASE_URL=<URL OF YOUR CLIENT (typically: http://localhost:3000)
APP_DOMAIN=localhost
```

Backend:
In the root folder, copy the contents of .env.example and create a .env file:

```
SECRET=<SECRET CODE FOR THE APP>
CLIENT_URL=<URL OF YOUR CLIENT (typically: http://localhost:3000)
PORT=<PORT TO RUN THE SERVER (ex. 8080)>
SERVER_URL=<URL OF YOUR SERVER (ex. http://localhost:8080)>
TYPEORM_HOST=<host for postgresSQL DB>
TYPEORM_USERNAME=<Postgres USERNAME>
TYPEORM_PASSWORD=<Postgres PASSWORD>
TYPEORM_DATABASE=<Postgres DATABASE NAME>
TYPEORM_PORT=<Postgres PORT (default: 5432)>
CLOUD_NAME=<CLOUDINARY NAME>
CLOUD_API_KEY=<CLOUDINARY API KEY>
CLOUD_SECRET=<CLOUDINARY SECRET KEY>
NODE_ENV=<Node Environment (ex. development)>
```
