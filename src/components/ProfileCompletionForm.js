import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { auth } from "../firebase"; // Import the Firebase auth object

const ProfileCompletionForm = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set the user state when the component mounts
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setFullName(authUser.displayName || "");
        setPhotoURL(authUser.photoURL || "");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        // Ensure that the photoURL is a valid URL
        if (isValidURL(photoURL)) {
          // Update the user's profile using Firebase Authentication's updateProfile method
          await user.updateProfile({
            displayName: fullName,
            photoURL: photoURL,
          });

          // Handle success or navigate to another page
          console.log("Profile updated successfully!");
        } else {
          console.error("Invalid photoURL format. Please enter a valid URL.");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Handle error
    }
  };

  // Function to check if a string is a valid URL
  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="photoURL">
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your profile photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleUpdateProfile}>
        Update Profile
      </Button>
    </Form>
  );
};

export default ProfileCompletionForm;
