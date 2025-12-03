import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001/api/reviews";

// search
function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4 w-full max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="Search by building or bathroom name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

//bathroom card
function BathroomCard({ bathroom, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-900">{bathroom.name}</h3>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
          ⭐ {bathroom.averageRating?.toFixed
            ? bathroom.averageRating.toFixed(1)
            : bathroom.averageRating}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-2">{bathroom.building}</p>

      {bathroom.amenities && bathroom.amenities.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {bathroom.amenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-700"
            >
              {a}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

//bathroom list 
function BathroomList({ bathrooms, onSelect }) {
  if (!bathrooms || bathrooms.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center mt-6">
        No bathrooms found.
      </p>
    );
  }

  return (
    <ul className="space-y-3 mt-4 w-full max-w-xl mx-auto">
      {bathrooms.map((bathroom) => (
        <li key={bathroom.id}>
          <BathroomCard
            bathroom={bathroom}
            onClick={() => onSelect(bathroom)}
          />
        </li>
      ))}
    </ul>
  );
}

export default function TopRatedBathrooms() {
  const navigate = useNavigate();
  const [bathrooms, setBathrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchTopBathrooms() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/top?limit=5`);
      if (!res.ok) {
        throw new Error("Failed to fetch top bathrooms");
      }
      const data = await res.json();
      setBathrooms(data);
    } catch (err) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function fetchBathroomsBySearch(term) {
    if (!term) {
      setSearchTerm("");
      fetchTopBathrooms();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearchTerm(term);

      const res = await fetch(
        `${API_BASE_URL}?search=${encodeURIComponent(term)}`
      );
      if (!res.ok) {
        throw new Error("Failed to search bathrooms");
      }
      const data = await res.json();

      setBathrooms(data.slice(0, 5));
    } catch (err) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopBathrooms();
  }, []);

  // need to update this when we have a details page 
  function handleSelectBathroom(bathroom) {
    navigate(`/bathrooms/${bathroom.id}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-6">
      <header className="w-full max-w-xl mx-auto mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          Top Rated Bathrooms
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 hover:underline"
        >
          Home
        </button>
      </header>

      <SearchBar onSearch={fetchBathroomsBySearch} initialValue={searchTerm} />

      {loading && (
        <p className="text-sm text-gray-500 text-center mt-4">
          Loading bathrooms…
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500 text-center mt-4">{error}</p>
      )}

      {!loading && !error && (
        <BathroomList
          bathrooms={bathrooms}
          onSelect={handleSelectBathroom}
        />
      )}
    </div>
  );
}