// pages/signup.jsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/Home.module.css";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const handleSignup = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        // Make an API request to create a new user account
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Redirect to the login page after successful signup
          router.push("/login");
        } else {
          // Handle errors from the API
          const data = await response.json();
          setError(data.message); // Assuming the API returns an error message
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setError("An error occurred during signup. Please try again later.");
      }
    };

    // Redirect to the login page after signup
    router.push("/login");
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
