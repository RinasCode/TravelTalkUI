import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AddReview() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    rate: "",
    address: "",
    review: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("rate", formData.rate);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("review", formData.review);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("authorId", localStorage.getItem('userId')); 

    try {
      const response = await axios.post("https://server.rinasismita.online/review", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      console.log("Review added:", response.data);
      navigate("/myreview"); 
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-8">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Add Review
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              size="lg"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              size="lg"
              label="Rate"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              size="lg"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              size="lg"
              label="Review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="file"
              size="lg"
              label="Upload Image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Submit Review
          </Button>
        </form>
      </Card>
    </div>
  );
}
