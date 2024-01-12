import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  USER_PROFILE_PATH,
  NOTES_LIST_PATH,
  CREATE_NOTE_PATH,
} from "../../data/Constants";
import { useAuth } from "../../context/AuthContext";
import { BsPencil } from "react-icons/bs";

const AuthenticatedRightSideMainNavBar = () => {
  const { logout, getCurrentUserName } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="d-flex align-items-center">
      <Link to={CREATE_NOTE_PATH}>
        {" "}
        <Button
          variant="primary"
          className="mr-2 rigth-margin"
          title="Create note"
        >
          <BsPencil />
        </Button>
      </Link>

      <Link to={NOTES_LIST_PATH}>
        <Button variant="outline-light" className="mr-2 rigth-margin">
          Notes
        </Button>
      </Link>
      <Dropdown>
        <Dropdown.Toggle
          variant="outline-light"
          id="user-dropdown"
          className="rounded-circle d-flex align-items-center justify-content-center {styles.kams}"
          style={{
            width: "42px",
            background: "#3ABBFF",
            border: "solid #ffffff",
            height: "36px",
          }}
        >
          {getCurrentUserName().charAt(0)}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={`${USER_PROFILE_PATH.replace(
              ":username",
              getCurrentUserName()
            )}`}
          >
            User Profile
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default AuthenticatedRightSideMainNavBar;
