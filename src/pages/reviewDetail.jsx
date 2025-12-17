import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/reviewDetailComp/headerReviewDetail";
import ReviewCard from "../components/reviewDetailComp/reviewCard";


export default function ReviewDetail() {
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReview() {
      try {
        const res = await fetch(
          `http://127.0.0.1:5001/api/reviews/${encodeURIComponent(id)}`
        );

        if (!res.ok) throw new Error("Review not found");

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

  return (
    <div className="review-detail-container">
      <Header
        buildingName={review?.building_name}
        room={review?.location_room}
        loading={loading}
      />

    <ReviewCard review={review} loading={loading} />


      {/* <ReviewCard
        review={review.OverallRating}
        onAddReview={() => navigate(`/addBathroom`)}
      /> */}


      {error && <p>{error}</p>}

      <div className="review-detail-content">
        {loading ? (
          <>
            <p className="skeleton" />
            <p className="skeleton" />
            <p className="skeleton" />
            <p className="skeleton" />
          </>
        ) : (
          <>
            <p><strong>Gender:</strong> {review.gender_type}</p>
            <p><strong>Room:</strong> {review.location_room}</p>
            <p><strong>Overall Rating:</strong> {review.OverallRating ?? "N/A"}</p>
            <p><strong>Cleanliness:</strong> {review.cleanliness_1_10 ?? "N/A"}</p>
            <p><strong>Privacy:</strong> {review.privacy_1_5 ?? "N/A"}</p>
            <p><strong>Odor:</strong> {review.odor_1_10 ?? "N/A"}</p>
          </>
        )}
      </div>
    </div>
  );
}
