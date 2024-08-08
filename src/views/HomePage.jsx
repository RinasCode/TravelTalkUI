import React, { useEffect } from "react";
import { CardDefault } from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "../features/reviewSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { review, loading, error } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  return (
    <>
      <br />
      <div className="flex flex-wrap justify-center">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {review &&
          review.map((hotel) => (
            <CardDefault
              key={hotel.id}
              name={hotel.name}
              review={hotel.review}
              address={hotel.address}
              rate={hotel.rate}
              image={hotel.image}
            />
          ))}
      </div>
    </>
  );
}
