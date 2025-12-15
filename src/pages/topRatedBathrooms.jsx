import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BathroomCard from "../components/homeComp/bathroomCard";
import "./topRatedBathrooms.css";

const API_BASE_URL = "http://localhost:5001/api/reviews";

function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="trb-search-form">
      <input
        type="text"
        placeholder="Search by building or bathroom name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="trb-search-input"
      />
      <button type="submit" className="trb-search-button">
        Search
      </button>
    </form>
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
      if (!res.ok) throw new Error("Failed to fetch top bathrooms");

      const data = await res.json();
      setBathrooms(data);
    } catch (err) {
      setError(err.message);
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
      if (!res.ok) throw new Error("Failed to search bathrooms");

      const data = await res.json();
      setBathrooms(data.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopBathrooms();
  }, []);

  function handleSelectBathroom(bathroom) {
    navigate(`/bathrooms/${bathroom.id}`);
  }

  return (
    <div className="trb-page">
      <h1>Top Rated Bathrooms</h1>
      <button onClick={() => navigate('/')}>Home</button>

      <SearchBar
        onSearch={fetchBathroomsBySearch}
        initialValue={searchTerm}
      />

      {loading && <p>Loading bathrooms…</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul className="trb-list">
          {bathrooms.map((b) => (
            <li key={b.id} onClick={() => handleSelectBathroom(b)}>
              <BathroomCard
                name={b.name}
                rating={b.averageRating}
                location={b.building}
                numReviews={1}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
