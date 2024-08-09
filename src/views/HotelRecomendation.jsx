import React, { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Button, Input, Card, Typography } from "@material-tailwind/react";
import HotelList from "../views/ResultGemini"; // Ensure the import path is correct

import { marked } from "marked";
import parse from "html-react-parser";

export default function ReviewForm() {
  const [harga, setHarga] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [hotelData, setHotelData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://server.rinasismita.online/review/gemini",
        { harga, lokasi },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(response.data);

      setHotelData(parse(marked.parse(response.data.data))); // Ensure response.data is in the expected format

      Toastify({
        text: "Data fetched successfully!",
        duration: 2000,
        gravity: "top",
        position: "left",
        background: "#00B29F",
        color: "#17202A",
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Failed to fetch data",
        duration: 2000,
        gravity: "top",
        position: "left",
        background: "#EF4C54",
        color: "#17202A",
      }).showToast();
    }
  };

  console.log(hotelData.data);

  return (
    <>
      <br />
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <Card className="w-full max-w-md mb-5 p-8">
          <Typography
            variant="h4"
            color="blue-gray"
            className="text-center mb-4"
          >
            Find Hotels
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                size="lg"
                label="Price Range (e.g., 10 juta)"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                size="lg"
                label="Location (e.g., Tangerang Selatan)"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="mt-4" fullWidth>
              Search
            </Button>
          </form>
        </Card>

        <Card className="w-full max-w-md p-8">{hotelData}</Card>
        {/* {hotelData && <HotelList data={hotelData} />}{" "} */}
        {/* Render HotelList below the form */}
      </div>
    </>
  );
}
