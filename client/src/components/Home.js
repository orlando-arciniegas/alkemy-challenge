import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TopBar from "./TopBar";
import Content  from "./Content";

const Profile = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <TopBar/>
        <Content/>
      </>
    )
  );
};

export default Profile;