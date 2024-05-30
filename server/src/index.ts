import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./db";
import bookRoutes from "./routes/books.routes";

dotenv.config();

const server = express();

connectToDb().then(() => {
  server.use(cors());
  server.use(express.json());
  server.use(bookRoutes);
});

server.listen("3000", () => {
  console.log("Server listening...");
});
