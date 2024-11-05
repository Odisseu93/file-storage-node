import { app } from "./app";

const port = 8080;

app.listen(port, async () => {
  console.log(`Listening on port http://localhost:${port}`);
});
