import { useState } from "react";

interface SearchInputProps {
  onSearch: (results: any[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e: React.FormEvent ) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const res = await fetch("http://localhost:3001/api/games/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await res.json();
      onSearch(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 flex justify-center items-center w-250">
      <input
        type="text"
        placeholder="Sök efter spel..."
        className="p-2 rounded-l-md border border-gray-300 w-2/3 bg-white/50"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-500 text-white px-4 py-2 rounded-r-md hover:bg-gray-900"
      >
        Search Game
      </button>
    </form>
  );
};

export default SearchInput;
