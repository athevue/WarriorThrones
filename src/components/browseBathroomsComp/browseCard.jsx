import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./browseCard.css";

export default function BrowseCard({ setBathroomCount }) {
  const [allReviews, setAllReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("All"); // start with capital "All"
  const [accessibleOnly, setAccessibleOnly] = useState(false);

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

  // Filter reviews based on search + filters
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

  // Update bathroom count for parent component
  useEffect(() => {
    setBathroomCount(filteredReviews.length);
  }, [filteredReviews, setBathroomCount]);

  // Build building options, only one "All" at the top
  const buildingOptions = ["All", ...Array.from(new Set(allReviews.map((r) => r.building_name)))];

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

        <div className="filter-wrapper">
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
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

              {/* Clear filters button */}
              <div className="filter-group">
                <button
                  className="clear-filters-button"
                  onClick={() => {
                    setGenderFilter("all");
                    setBuildingFilter("All"); // reset to capital "All"
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
          {filteredReviews.map((review, index) => (
            <Link // using Link for client-side routing
              to={`/reviewDetail/${review.id}`} // always use numeric ID now
              key={index}
              className="review-card-link"
            >
              <div className="review-card">
                <h3>{review.building_name}</h3>
                <p></p>
                <p><strong>Gender:</strong> {review.gender_type}</p>
                <p><strong>Room:</strong> {review.location_room}</p>
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
