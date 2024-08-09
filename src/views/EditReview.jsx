import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function EditReview() {
  const { id } = useParams(); // Get ID from URL parameters
  const navigate = useNavigate(); // For navigation after submission

  const [formData, setFormData] = useState({
    name: "",
    rate: "",
    address: "",
    review: "",
    image: "", // Initialize with an empty string for URL
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch review data by ID from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://server.rinasismita.online/review/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        const reviewData = response.data;
        setFormData({
          name: reviewData.name || "",
          rate: reviewData.rate || "",
          address: reviewData.address || "",
          review: reviewData.review || "",
          image: reviewData.image || "", // Set image URL
        });
      } catch (error) {
        console.error("Error fetching review data:", error);
        Toastify({
          text: "Failed to fetch review data",
          duration: 2000,
          gravity: "top",
          position: "left",
          background: "#EF4C54",
          color: "#17202A",
        }).showToast();
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("rate", formData.rate);
    updatedData.append("address", formData.address);
    updatedData.append("review", formData.review);
    if (file) {
      updatedData.append("image", file);
    } else {
      updatedData.append("image", formData.image); // Send existing image URL if no new file is selected
    }
    
    
    try {
      await axios.put(`https://server.rinasismita.online/review/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      Toastify({
        text: "Review updated successfully",
        duration: 2000,
        gravity: "top",
        position: "left",
        background: "#00B29F",
        color: "#17202A",
      }).showToast();

      navigate("/myreview"); // Navigate to MyReview after successful update
    } catch (error) {
      console.error("Error updating review:", error);
      Toastify({
        text: "Failed to update review",
        duration: 2000,
        gravity: "top",
        position: "left",
        background: "#EF4C54",
        color: "#17202A",
      }).showToast();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-8">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Edit Review
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
            {formData.image && (
              <div className="mb-2">
                <img src={formData.image} alt="Current" className="w-full h-auto rounded" />
              </div>
            )}
            <Input
              type="file"
              size="lg"
              label="Upload New Image (Optional)"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Update Review
          </Button>
        </form>
      </Card>
    </div>
  );
}
