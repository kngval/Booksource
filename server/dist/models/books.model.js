"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    sender: {
        type: String,
    },
    genre: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
    },
});
const BookSchema = mongoose_1.default.model("books", schema);
exports.default = BookSchema;
