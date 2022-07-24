import { Response, Request } from "express";

import AppLog from "./utils/AppLog";
import app from "./app";
import "dotenv/config";

// const { PORT, HOST } = process.env;

// const port = +PORT || 4000;
// const host = HOST || "localhost";

app.get("/", async (req: Request, res: Response) => res.send("API online"));
app.listen(+process.env.PORT || 4000, () =>
  AppLog("Server", `Server running on port ${+process.env.PORT || 4000}`)
);
