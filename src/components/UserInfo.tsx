"use client";

import React, { useState, useEffect } from "react";

const UserInfo = () => {
  const [user, setUser] = useState<any>(null); // Consider defining a more specific type for user
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      try {
        const response = await fetch("/api/retrieve-user-information");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data.data); // Assuming the data comes in a {data: {...}} format
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safely assign the error message
        } else {
          setError("An unexpected error occurred"); // Fallback error message
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default UserInfo;
