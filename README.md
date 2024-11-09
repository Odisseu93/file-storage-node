# File storage
Backend for uploading, downloading and deleting files on Google Cloud.

## Environment variables
```bash

API_URL="http://localhost:8080"
SERVICE_ACCOUNT_CREDENTIALS_PATH="./path_to_my_credential/credentials.json"

# Firebase environment variables
# https://firebase.google.com/docs/app-distribution/authenticate-service-account?platform=ios
API_KEY="my_api_key"
AUTH_DOMAIN="my_domain"
DATABASE_URL="my_database_url"
PROJECT_ID="firebase_project_id"
STORAGE_BUCKET="my-bucket.com"
MESSAGING_SENDER_ID="0000000"
APP_ID="id:00dsfdsljkjadslfkj"

```

## Running locally 
**Bun (JavaScript runtime and toolkit)**: [installation link](https://bun.sh/)

To install project dependencies:
```bash
bun install
```

**[Prisma (ORM)](https://www.prisma.io/docs/getting-started)**


Apply prisma migrations:
```bash
# https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate
npx prisma migrate deploy
```
Generate Prisma Client

```bash
# https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate
npx prisma generate
```

To Run
```bash
bun run 
```

## Some important links
- [Multer NPM package](https://www.npmjs.com/package/multer)
- [Firebase - Authenticate with a service account](https://firebase.google.com/docs/app-distribution/authenticate-service-account?platform=ios)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Google cloud - Streaming-downloads](https://cloud.google.com/storage/docs/streaming-downloads)
- [Google cloud - Upload objects from memory](https://cloud.google.com/storage/docs/uploading-objects-from-memory)
- [Google cloud - Create a GET-signed URL](https://cloud.google.com/storage/docs/samples/storage-generate-signed-url-v4)

## Developer

<div align="center">
  <img src="https://user-images.githubusercontent.com/76600539/235897309-88ab21df-d0be-4905-829c-36ab68ebc2e8.png" alt="developer: Ulisses Silvério"    width="200px" align="center"/>
</div>
<br>
<div align="center" margin="50px">
 <a href="https://ulisses.tec.br" align="center">
  <b>Ulisses Silvério</b>
</a>
</div>

