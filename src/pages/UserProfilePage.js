import React from "react";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import MainFooter from "../components/Footer/MainFooter";
import ViewUserProfileContainer from "../components/UserProfilePage/ViewUserProfileContainer";
import { useAuth } from "../context/AuthContext";

const UserProfilePage = () => {
  const { requireAuthenticated } = useAuth();
  if (!requireAuthenticated()) return;

  return (
    <>
      <MainNavBar />
      <ViewUserProfileContainer />
      <MainFooter />
    </>
  );
};

export default UserProfilePage;
