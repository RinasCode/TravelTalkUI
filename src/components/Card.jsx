import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CardDefault({ name, review, address, rate, image }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Card className="m-4 mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={image}
            alt="hotel-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography>{review}</Typography>
          <Typography variant="subtitle1" color="blue-gray" className="mt-2">
            {address}
          </Typography>
          <Typography variant="subtitle2" color="blue-gray" className="mt-1">
            <p>{formatRupiah(rate)}</p>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={toggleModal}>Show More</Button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={image}
              alt="enlarged-hotel-image"
              className="max-w-screen max-h-screen object-contain"
            />
            <Button
              onClick={toggleModal}
              className="absolute top-2 right-2"
              color="red"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
