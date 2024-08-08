import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({ id, name, review, address, rate, image, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-80 flex flex-col items-center">
      {image && (
        <img
          src={image}
          alt={name}
          className="rounded-t-lg mb-4 w-full h-48 object-cover"
        />
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-700 mt-2 text-center">{review}</p>
      <p className="text-gray-500 mt-2 text-center">{address}</p>
      <p className="text-black mt-2 text-center">Rp {rate.toLocaleString("id-ID")}</p>
      <div className="flex justify-between mt-4 w-full">
        <button
          onClick={handleEdit}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-1/2 mr-1"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-1/2 ml-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
