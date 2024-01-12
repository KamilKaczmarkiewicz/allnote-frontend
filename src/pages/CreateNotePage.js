import React from "react";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import CreateNotePageContainer from "../components/NotePage/CreateNotePageContainer";
import MainFooter from "../components/Footer/MainFooter";
import { useAuth } from "../context/AuthContext";

const CreateNotePage = () => {
  const { requireAuthenticated } = useAuth();
  if (!requireAuthenticated()) return;
    return (
        <>
          <MainNavBar />
          <CreateNotePageContainer />
          <MainFooter />
        </>
      );
};

export default CreateNotePage;
