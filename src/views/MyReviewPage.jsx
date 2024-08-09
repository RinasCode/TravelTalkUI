import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("https://server.rinasismita.online/review/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data.reviewed);
      } catch (error) {
        setError("Error fetching my reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`https://server.rinasismita.online/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state to remove the deleted review
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <>
      <br />
      <div className="flex flex-wrap justify-center">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="relative">
              <ReviewCard
                id={review.id}
                name={review.name}
                review={review.review}
                address={review.address}
                rate={review.rate}
                image={review.image}
                onDelete={handleDelete} // Pass handleDelete function to ReviewCard
              />
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </>
  );
}
