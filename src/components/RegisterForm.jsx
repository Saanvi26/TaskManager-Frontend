import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SignupFormDemo } from "./SignupForm";
import {jwtDecode} from 'jwt-decode';

const RegisterForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      const decodedToken = jwtDecode(Cookies.get("token"));
      const username = decodedToken.username;
        navigate("/home", { state: { username } });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      // REGISTER
      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Registration successful:", responseData);
      // Navigate to home
      navigate("/home", { state: { username: data.username } });
      console.log("Welcome", data.username);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-5xl text-neutral-800 dark:text-neutral-200">
        Register
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"></p>
      <form className="my-8" onSubmit={handleSubmit}>
        <SignupFormDemo />
      </form>
    </div>
  </div>
  
  );
};

export default RegisterForm;
