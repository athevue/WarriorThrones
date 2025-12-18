import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BathroomCard from "../components/homeComp/bathroomCard";
import "./topRatedBathrooms.css";

const API_BASE_URL = "http://localhost:5001/api/reviews";

export default function TopRatedBathrooms() {
  const navigate = useNavigate();

  const [bathrooms, setBathrooms] = useState([]);       // what you display
  const [allBathrooms, setAllBathrooms] = useState([]); // store full results for filtering
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // --- filter state (same as first component) ---
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("All");
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  async function fetchTopBathrooms() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/top?limit=5`);
      if (!res.ok) throw new Error("Failed to fetch top bathrooms");

      const data = await res.json();

      setAllBathrooms(data);
      setBathrooms(data); // top 5 already
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBathroomsBySearch(term) {
    const trimmed = (term ?? "").trim();

    if (!trimmed) {
      setSearchTerm("");
      fetchTopBathrooms();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearchTerm(trimmed);

      const res = await fetch(
        `${API_BASE_URL}?search=${encodeURIComponent(trimmed)}`
      );
      if (!res.ok) throw new Error("Failed to search bathrooms");

      const data = await res.json();

      // store full search results, then filters will reduce + slice to 5
      setAllBathrooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopBathrooms();
  }, []);

  // Build building options from whatever is currently loaded (top or search results)
  const buildingOptions = useMemo(() => {
    const buildings = Array.from(
      new Set(
        (allBathrooms || [])
          .map((b) => b.building)
          .filter(Boolean)
      )
    );
    return ["All", ...buildings];
  }, [allBathrooms]);

  // Apply filters + search, then show only top 5
  const filteredBathrooms = useMemo(() => {
    const q = (searchTerm || "").toLowerCase();

    const filtered = (allBathrooms || []).filter((b) => {
      // search like first component (building/name/room-ish)
      const matchesSearch =
        !q ||
        (b.building || "").toLowerCase().includes(q) ||
        (b.name || "").toLowerCase().includes(q) ||
        (b.room || b.location_room || "").toLowerCase().includes(q);

      // gender filter (expects b.gender_type like your other component)
      const matchesGender =
        genderFilter === "all" || b.gender_type === genderFilter;

      // building filter
      const matchesBuilding =
        buildingFilter === "All" || b.building === buildingFilter;

      // accessible filter (expects boolean-ish)
      const matchesAccessible = !accessibleOnly || Boolean(b.accessible);

      return (
        matchesSearch &&
        matchesGender &&
        matchesBuilding &&
        matchesAccessible
      );
    });

    return filtered.slice(0, 5);
  }, [
    allBathrooms,
    searchTerm,
    genderFilter,
    buildingFilter,
    accessibleOnly,
  ]);

  function handleSelectBathroom(bathroom) {
    navigate(`/bathrooms/${bathroom.id}`);
  }

  return (
    <div className="trb-page">
      <h1>Top Rated Bathrooms</h1>
      <button onClick={() => navigate("/")}>Home</button>

      {/* Search + Filter bar (same structure as first component) */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search bathrooms, buildings, rooms..."
            value={searchTerm}
            onChange={(e) => {
              const v = e.target.value;
              setSearchTerm(v);
              fetchBathroomsBySearch(v);
            }}
          />
        </div>

        <div className="filter-wrapper">
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
            type="button"
          >
            Filters ▼
          </button>

          {showFilters && (
            <div className="filter-dropdown">
              {/* Building filter */}
              <div className="filter-group">
                <label>Building Name:</label>
                <select
                  value={buildingFilter}
                  onChange={(e) => setBuildingFilter(e.target.value)}
                >
                  {buildingOptions.map((b, i) => (
                    <option key={i} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender filter */}
              <div className="filter-group">
                <label>Gender:</label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Gender-Neutral">Gender-Neutral</option>
                </select>
              </div>

              {/* Accessible only checkbox */}
              <div className="filter-group">
                <label>
                  <input
                    type="checkbox"
                    checked={accessibleOnly}
                    onChange={(e) => setAccessibleOnly(e.target.checked)}
                  />{" "}
                  Accessible Only
                </label>
              </div>

              {/* Clear filters */}
              <div className="filter-group">
                <button
                  className="clear-filters-button"
                  type="button"
                  onClick={() => {
                    setGenderFilter("all");
                    setBuildingFilter("All");
                    setAccessibleOnly(false);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && <p>Loading bathrooms…</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul className="trb-list">
          {filteredBathrooms.map((b) => (
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
