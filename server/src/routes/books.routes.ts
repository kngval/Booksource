import express from "express";
import { getBooks,postBooks } from "../controller/books.controller";

const router = express.Router();

router.get("/", getBooks)

router.post("/", postBooks)

export default router