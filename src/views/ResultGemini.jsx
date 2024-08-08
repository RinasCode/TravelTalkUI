import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

// Updated parseData function
const parseData = (data) => {
  if (typeof data !== "string") {
    console.error("Data is not a string:", data);
    return [];
  }

  const hotelEntries = data.split("\n").filter((line) => line.trim() !== "");

  return hotelEntries
    .map((item) => {
      const match = item.match(
        /^(\d+)\.\s+(.*?)\s+-\s+Rp([\d.,]+)\s+-\s+(.*)$/
      );
      if (!match) return null;

      const [, , name, price, description] = match;

      return {
        name: name.trim(),
        price: `Rp ${price.trim()}`,
        description: description.trim(),
      };
    })
    .filter(Boolean);
};

export default function HotelList() {
  const location = useLocation();
  const { hotelData } = location.state || { hotelData: "" };

  console.log("Data received:", hotelData);

  const hotels = parseData(hotelData);
  console.log("Parsed hotels:", hotels);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-gray-100 min-h-screen">
      {hotels.length === 0 ? (
        <Typography color="blue-gray" className="text-center">
          No hotels found.
        </Typography>
      ) : (
        hotels.map((hotel, index) => (
          <Card key={index} className="w-full max-w-sm">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                {hotel.name}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                {hotel.price}
              </Typography>
              <Typography color="blue-gray">{hotel.description}</Typography>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
