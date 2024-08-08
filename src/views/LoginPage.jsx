import React, { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.jpg";
import { GoogleLogin } from "@react-oauth/google";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SimpleLoginForm({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.message || "Google login failed",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(`${url}/login`, addedData);
      localStorage.setItem("access_token", data.access_token);

      Toastify({
        text: "Success Login",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Login failed",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center">
      <img
        className="w-full h-full object-cover absolute top-0 left-0 z-[-1]"
        src={background}
        alt="background"
      />
      <div className="flex justify-center items-center w-full max-w-md">
        <Card className="w-full bg-slate-400 bg-opacity-60 backdrop-blur-md border rounded-lg p-8">
          <Typography variant="h4" color="white" className="text-center">
            Sign In
          </Typography>
          <Typography color="black" className="mt-1 font-normal text-center">
            Welcome back! Please enter your details to login.
          </Typography>
          <form className="mt-8 mb-2" onSubmit={handleLogin}>
            <div className="mb-4">
              <Typography variant="h6" color="white" className="-mb-1">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className="mt-2 border-t-blue-gray-200 focus:border-t-gray-900 text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6" color="white" className="-mb-1">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="mt-2 border-t-blue-gray-200 focus:border-t-gray-900 text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    Remember me
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <a href="#" className="font-medium text-white">
                Forgot Password?
              </a>
            </div>
            <Button className="mt-6" fullWidth type="submit">
              Sign In
            </Button>
            <Typography color="white" className="mt-4 text-center font-normal">
              Don't have an account?
              <a
                href="http://localhost:8000/register"
                className="font-medium text-white"
              >
                Sign Up
              </a>
            </Typography>
          </form>
          <div className="my-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <Typography className="mx-4 text-gray-500" variant="small">
              OR
            </Typography>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="mt-6 flex justify-center items-center">
            <GoogleLogin onSuccess={googleLogin} />
          </div>
        </Card>
      </div>
    </div>
  );
}
