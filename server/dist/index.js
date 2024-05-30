"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const books_routes_1 = __importDefault(require("./routes/books.routes"));
dotenv_1.default.config();
const server = (0, express_1.default)();
(0, db_1.connectToDb)().then(() => {
    server.use((0, cors_1.default)());
    server.use(express_1.default.json());
    server.use(books_routes_1.default);
});
server.listen("3000", () => {
    console.log("Server listening...");
});
