import React, { useState } from "react";
import background from "../assets/background.jpg";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Toastify from "toastify-js";

export function SimpleRegistrationForm({ url }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/register`, { name, email, password });
      // Handle successful registration
      Toastify({
        text: "Registration successful!",
        duration: 3000,
        style: { background: "green" },
      }).showToast();
      // Redirect to login page or home page
    } catch (error) {
      // Handle error, e.g., show error message
      Toastify({
        text: "Registration failed. Please try again.",
        duration: 3000,
        style: { background: "red" },
      }).showToast();
    }
  };

  return (
    <>
      <div className="h-screen w-full relative flex items-center justify-center">
        <img className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" src={background} alt="background" />
        <div className="flex justify-center items-center">
          <Card className="w-[90%] max-w-md bg-slate-400 bg-opacity-40 backdrop-blur-md border rounded-lg p-8">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Sign Up
            </Typography>
            <Typography color="white" className="mt-1 font-normal text-center">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2" onSubmit={handleSubmit}>
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray" className="-mb-1">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Your Name"
                  className="mt-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray" className="-mb-1">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className="mt-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray" className="-mb-1">
                  Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="mt-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree to the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <Button className="mt-6" fullWidth type="submit">
                Sign Up
              </Button>
              <Typography color="white" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a href="http://localhost:8000/login" className="font-medium text-gray-900">
                  Sign In
                </a>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
