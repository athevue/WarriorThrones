import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReviewDetail() {
  const { id } = useParams();
  console.log("URL param id:", id);

  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReview() {
      try {
        const res = await fetch(
          `http://127.0.0.1:5001/api/reviews/${encodeURIComponent(id)}`
        );

        if (!res.ok) {
          throw new Error("Review not found");
        }

        const data = await res.json();
        setReview(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [id]);

  if (loading) return <p>Loading review...</p>;
  if (error) return <p>{error}</p>;
  if (!review) return <p>No review data</p>;

  console.log("REVIEW DATA:", review);

  return (
    <div className="review-detail-container">
      <button onClick={() => navigate(-1)}>← Back</button>

    {/* Can adjust in the future for whatever fields are present in the review */}
      <h1>{review.building_name}</h1>

      <p><strong>Gender:</strong> {review.gender_type}</p>
      <p><strong>Room:</strong> {review.location_room}</p>
      <p><strong>Overall Rating:</strong> {review.OverallRating ?? "N/A"}</p>

      <p><strong>Cleanliness:</strong> {review.cleanliness_1_10 ?? "N/A"}</p>
      <p><strong>Privacy:</strong> {review.privacy_1_5 ?? "N/A"}</p>
      <p><strong>Odor:</strong> {review.odor_1_5 ?? "N/A"}</p>
    </div>
  );
}
