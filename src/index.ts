import express, { Request, Response } from "express";
import { render } from "./cli";
import { createFiles } from "./create";
const requestIp = require("request-ip");
const { prompt } = require("enquirer");

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  // res.status(200).json("Hello, World!");
});

app.get("/cli", async (req: Request, res: Response) => {
  // render();
  createFiles();
  res.status(200).json("cli executed");
});

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
