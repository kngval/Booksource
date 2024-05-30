import { Request, Response } from "express";
import BookSchema from "../models/books.model";

//GET BOOKS
export const getBooks = async (_req: Request, res: Response) => {
  try {
    const response = await BookSchema.find().sort({ createdAt: -1 });
    return response
      ? res.status(200).json(response)
      : res.status(400).json("No Books found");
  } catch (error) {
    return res.status(500).json("Error fetching books");
  }
};

export const postBooks = async (req: Request, res: Response) => {
  const {
    title,
    author,
    description,
    sender,
    genre,
  }: {
    title: string;
    author: string;
    description: string;
    sender: string;
    genre: string;
  } = req.body;

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
    const newBook = await BookSchema.create({
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
  } catch (error) {
    return res.status(500).json(error);
  }
};
