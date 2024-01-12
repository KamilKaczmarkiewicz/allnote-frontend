import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { HOME_PATH, LOGIN_PATH, USER_PROFILE_PATH, NOTES_LIST_PATH, VIEW_NOTE_PATH, CREATE_NOTE_PATH, EDIT_NOTE_PATH } from "./data/Constants";
import { AuthProvider } from "./context/AuthContext";
import UserProfilePage from "./pages/UserProfilePage";
import NotesListPage from "./pages/NotesListPage";
import ViewNotePage from "./pages/ViewNotePage";
import PageNotFound from "./pages/PageNotFound";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";

function App() {
  return (
    <AuthProvider>
    <Routes>
        <Route path={HOME_PATH} element={<HomePage/>} />
        <Route path={LOGIN_PATH} element={<LoginPage/>} />
        <Route path={USER_PROFILE_PATH} element={<UserProfilePage/>} />
        <Route path={NOTES_LIST_PATH} element={<NotesListPage/>} />
        <Route path={VIEW_NOTE_PATH} element={<ViewNotePage/>} />
        <Route path={EDIT_NOTE_PATH} element={<EditNotePage/>} />
        <Route path={CREATE_NOTE_PATH} element={<CreateNotePage />} />
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
      </AuthProvider>
  );
}

export default App;
