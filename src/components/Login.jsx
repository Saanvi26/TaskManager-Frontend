import React, { useEffect } from "react";
import { LoginFormDemo } from "./LoginFormDemo";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      const token = Cookies.get("token");
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      navigate("/home", { state: { username: username } });
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      const { success } = responseData;
      console.log(success);
      // console.log('Login user', responseData.user);
      if (responseData.user && responseData.success === true) {
        console.log("Login successful !!!! ");
        // Redirect to Home
        const token = Cookies.get("token");
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;
        navigate("/home", { state: { username: username } });
      } else {
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-5xl text-neutral-800 dark:text-neutral-200">
          Login
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"></p>
        <form className="my-8" onSubmit={handleLogin}>
          <LoginFormDemo />
        </form>
      </div>
    </div>
  );
};

export default Login;
