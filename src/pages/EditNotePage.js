import React from "react";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import MainFooter from "../components/Footer/MainFooter";
import { useAuth } from "../context/AuthContext";
import EditNotePageContainer from "../components/NotePage/EditNotePageContainer";

const EditNotePage = () => {
  const { requireAuthenticated } = useAuth();
  if (!requireAuthenticated()) return;

  return (
    <>
      <MainNavBar />
      <EditNotePageContainer />
      <MainFooter />
    </>
  );
};

export default EditNotePage;
