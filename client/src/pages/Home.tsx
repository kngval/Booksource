import { useEffect, useState } from "react";
import Suggestions from "../components/Suggestions";
import reading from "../assets/reading.svg";
// import dotenv from "dotenv";
export type Suggestion = {
  title: string;
  author: string;
  genre: string;
  description: string;
  sender: string;
};

const Home = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchSuggestions();
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "GET",
      });
      const resSuggestions = await res.json();
      setSuggestions(resSuggestions);
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        title,
        author,
        genre,
        description,
        sender,
      };
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      console.log(responseData);
      if (!res.ok) {
        setError(responseData.error);
      } else {
        fetchSuggestions();
        setToggle(false);
        setTitle("");
        setAuthor("");
        setDescription("");
        setGenre("");
        setSender("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-[10rem]">
      <div className="   text-white text-center mt-[5rem]">
        Book Recommendations Please 📖!
        <p className="text-xs ">(Do not include any spoilers/major plots)</p>
      </div>
      <div className="grid place-items-center text-white">
        <button
          onClick={() => setToggle(!toggle)}
          type="button"
          className="bg-slate-500 py-2 w-[320px] sm:w-[400px] md:w-[500px] lg:w-[900px]  my-5"
        >
          Add New
        </button>

        <form
          onSubmit={handleSubmit}
          className={`${
            toggle ? "block" : "hidden"
          } bg-slate-900 text-sm md:text-md p-4 w-[340px] sm:w-[400px] md:w-[500px] lg:w-[900px] mb-5 grid gap-3`}
        >
          <div>
            <label className="block">Title:</label>
            <input
              type="text"
              className="bg-transparent border-[1px] rounded-md p-2 w-full outline-none"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g Lock Every Door"
            />
          </div>
          <div>
            <label className="block">Author:</label>
            <input
              type="text"
              className="bg-transparent border-[1px] rounded-md p-2 w-full outline-none"
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g Riley Sager"
            />
          </div>
          <div>
            <label className="block">Genre:</label>
            <input
              type="text"
              className="bg-transparent border-[1px] rounded-md p-2 w-full outline-none"
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Thriller/Mystery"
            />
          </div>
          <div>
            <label className="block">Overview:</label>
            <textarea
              rows={5}
              className="bg-transparent border-[1px] rounded-md p-2 w-full outline-none"
              placeholder="Don't reveal any spoilers/major plots in the book, e.g About an apartment sitter at an exclusive building in Manhattan who discovers that her predecessor in the job disappeared under suspicious circumstances."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block">Sender:</label>
            <input
              type="text"
              className="bg-transparent border-[1px] rounded-md p-2 w-full outline-none"
              onChange={(e) => setSender(e.target.value)}
              placeholder="Indicate Your Name"
            />
          </div>
          {error && (
            <div className="w-full border-2 p-4 border-white">
              Error : {error}
            </div>
          )}
          <div>
            <button type="submit" className="w-full bg-slate-500 p-4">
              Submit
            </button>
          </div>
        </form>
      </div>
      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 place-items-center gap-5">
          {suggestions.map((book: Suggestion) => (
            <div className="w-[340px] sm:w-[400px] md:w-[500px] lg:w-[900px] p-4 bg-slate-900">
              <Suggestions
                title={book.title}
                author={book.author}
                genre={book.genre}
                description={book.description}
                sender={book.sender}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`${
            toggle ? "hidden" : "block"
          } text-center text-white grid place-items-center`}
        >
          <img src={reading} className="w-[300px] my-10" alt="" />
          <h1 className="text-xs md:text-sm">
            No book suggestions at the moment...
          </h1>
        </div>
      )}
      <div className="text-center text-slate-400 my-5 text-xs md:text-sm">
        (made by Brent Valino for personal use only)
      </div>
    </div>
  );
};

export default Home;
