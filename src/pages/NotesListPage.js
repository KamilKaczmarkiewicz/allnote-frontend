import React from "react";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import MainFooter from "../components/Footer/MainFooter";
import NotesListContainer from "../components/NotesListPage/NotesListContainer";
import { useAuth } from "../context/AuthContext";

const NotesListPage = () => {
  const { requireAuthenticated } = useAuth();
  if (!requireAuthenticated()) return;

  return (
    <>
      <MainNavBar />
      <NotesListContainer />
      <MainFooter />
    </>
  );
};

export default NotesListPage;
