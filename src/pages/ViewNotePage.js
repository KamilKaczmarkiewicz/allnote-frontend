import React from "react";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import MainFooter from "../components/Footer/MainFooter";
import ViewNotePageContainer from "../components/NotePage/ViewNotePageContainer";
import { useAuth } from "../context/AuthContext";

const ViewNotePage = () => {
  const { requireAuthenticated } = useAuth();
  if (!requireAuthenticated()) return;

  return (
    <>
      <MainNavBar />
      <ViewNotePageContainer />
      <MainFooter />
    </>
  );
};

export default ViewNotePage;
