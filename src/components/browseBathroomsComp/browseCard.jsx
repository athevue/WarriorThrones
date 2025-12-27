import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./browseCard.css";

export default function BrowseCard({ setBathroomCount }) {
  const [allReviews, setAllReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("All");
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  // Ref for click-outside detection
  const filterRef = useRef(null);

  // Fetch all reviews
  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const res = await fetch("http://127.0.0.1:5001/api/reviews/all");
        const data = await res.json();

        const mappedData = data.map((r) => ({
          id: r.id,
          building_name: r.building_name,
          gender_type: r.gender_type,
          location_room: r.location_room,
          accessible: r.accessible || false,
          overall_rating: r.OverallRating,
        }));

        setAllReviews(mappedData);
      } catch (err) {
        console.error("Error fetching all reviews:", err);
      }
    }

    fetchAllReviews();
  }, []);

  // Click outside to close filters
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter logic
  const filteredReviews = allReviews.filter((review) => {
    const q = searchTerm.toLowerCase();

    const matchesSearch =
      review.building_name?.toLowerCase().includes(q) ||
      review.gender_type?.toLowerCase().includes(q) ||
      review.location_room?.toLowerCase().includes(q);

    const matchesGender =
      genderFilter === "all" || review.gender_type === genderFilter;

    const matchesBuilding =
      buildingFilter === "All" || review.building_name === buildingFilter;

    const matchesAccessible = !accessibleOnly || review.accessible;

    return matchesSearch && matchesGender && matchesBuilding && matchesAccessible;
  });

  // Update parent count
  useEffect(() => {
    setBathroomCount(filteredReviews.length);
  }, [filteredReviews, setBathroomCount]);

  // Building options
  const buildingOptions = [
    "All",
    ...Array.from(new Set(allReviews.map((r) => r.building_name))),
  ];

  return (
    <div className="browse-card-container">
      {/* Search + Filter */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search bathrooms, buildings, rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-wrapper" ref={filterRef}>
          <button
            className="filter-button"
            onClick={() => setShowFilters((prev) => !prev)}
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

              {/* Accessible */}
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

      {/* Cards */}
      {filteredReviews.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <div className="cards-wrapper">
          {filteredReviews.map((review) => (
            <Link
              to={`/reviewDetail/${review.id}`}
              key={review.id}
              className="review-card-link"
            >
              <div className="review-card">
                <h3>{review.building_name}</h3>
                <p><strong>Room:</strong> {review.location_room}</p>
                <p><strong>Gender:</strong> {review.gender_type}</p>
                <p><strong>Overall Rating:</strong> {review.overall_rating}</p>
                {review.accessible && <p>♿ Accessible</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
