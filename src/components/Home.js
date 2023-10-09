import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import ProfileCompletionForm from "./ProfileCompletionForm"; // Import the ProfileCompletionForm component

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // State to track whether to show the profile completion form
  const [showProfileForm, setShowProfileForm] = useState(false);

  // Function to toggle the visibility of the profile completion form
  const toggleProfileForm = () => {
    setShowProfileForm(!showProfileForm);
  };

  // Check if the user's profile is incomplete
  const isProfileIncomplete = !user.displayName || !user.photoURL;

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Welcome To Expense Tracker !!!<br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>

        {isProfileIncomplete && (
          // Show the Complete Profile button if the profile is incomplete
          <Button variant="success" onClick={toggleProfileForm}>
            Complete Profile
          </Button>
        )}
      </div>

      {showProfileForm && (
        // Show the ProfileCompletionForm when the button is clicked
        <ProfileCompletionForm />
      )}
    </>
  );
};

export default Home;
