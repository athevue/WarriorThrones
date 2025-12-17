import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/reviewDetailComp/headerReviewDetail";
import ReviewCard from "../components/reviewDetailComp/reviewCard";
import DetailedRating from "../components/reviewDetailComp/detailedRating";



export default function ReviewDetail() {
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <DetailedRating review={review} loading={loading} />

    </div>
  );
}
