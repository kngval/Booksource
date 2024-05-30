"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controller/books.controller");
const router = express_1.default.Router();
router.get("/", books_controller_1.getBooks);
router.post("/", books_controller_1.postBooks);
exports.default = router;
