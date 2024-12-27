import express, { Request, Response } from "express";
import { Db } from "./db/mysql.db";
import fileRouter from "./routes/file.routes";

const app = express();

async function main() {
  await Db.init();
  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/v1/api/file", fileRouter)
    .get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

  const server = app.listen(5000, () => {
    console.log(`server listening on http://localhost:${5000}`);
  });
}

main().catch((err) => {
  console.log(err);
});
