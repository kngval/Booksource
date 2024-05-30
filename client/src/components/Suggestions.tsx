const Suggestions = ({
  title,
  author,
  description,
  sender,
  genre
}: {
  title: string;
  author: string;
  description: string;
  sender: string;
  genre:string;
}) => {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-white text-lg sm:text-xl">{title}</h1>
        <h5 className="text-slate-200">Author : {author}</h5>
        <p className="text-sm text-slate-400">Genre: {genre}</p>
      </div>
      <div>
        <p className="text-slate-300">{description}</p>
      </div>
      <p className="text-slate-400 mt-2">from : {sender}</p>
    </>
  );
};

export default Suggestions;
