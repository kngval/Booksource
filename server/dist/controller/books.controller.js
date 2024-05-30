"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBooks = exports.getBooks = void 0;
const books_model_1 = __importDefault(require("../models/books.model"));
//GET BOOKS
const getBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield books_model_1.default.find().sort({ createdAt: -1 });
        return response
            ? res.status(200).json(response)
            : res.status(400).json("No Books found");
    }
    catch (error) {
        return res.status(500).json("Error fetching books");
    }
});
exports.getBooks = getBooks;
const postBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, description, sender, genre, } = req.body;
    try {
        if (!title) {
            return res.status(404).json({ error: "Please provide the Book Title" });
        }
        if (!author) {
            return res.status(404).json({ error: "Please provide the Book Author" });
        }
        if (!description) {
            return res
                .status(404)
                .json({ error: "Please provide the Book Overview" });
        }
        if (!sender) {
            return res
                .status(404)
                .json({ error: "Please indicate your name in the sender field" });
        }
        if (!genre) {
            return res.status(404).json({ error: "Please provide the Book Genre" });
        }
        if (!title || !author || !description || !sender || !genre) {
            return res.status(404).json({ error: "All fields are required" });
        }
        const newBook = yield books_model_1.default.create({
            title,
            author,
            genre,
            description,
            sender,
            createdAt: new Date(),
        });
        console.log(newBook);
        return newBook
            ? res.status(200).json(newBook)
            : res.status(400).json({ error: "Error creating book" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.postBooks = postBooks;
