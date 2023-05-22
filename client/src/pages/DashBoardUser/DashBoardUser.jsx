import { useState } from "react";
import "../DashBoardUser/DashBoardUser.css";

import DashBoardUsersConteiner from "./DashBoardUsersConteiner";

import DashBoardListUsers from "../DashBoardUser/ListUsers";
import DashBoardNavUsers from "./NavUsers";
import Pagination from "./Pagination/Pagination";
import DashBoardUserDetail from "./DashBoardUserDetail";
import { useSelector } from "react-redux";


const DashBoardUser = () => {
  const navTab = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    overflow: "hidden",
    paddingTop: "7px",
    height: "50px",
  };

  const tab = {
    backgroundColor: "#ff7f2a",
    width: "max-content",
    padding: "11px 20px 11px 20px",
    borderRadius: "10px",
    color: "white",
    marginRight: "8px",
    cursor: "pointer",
  };
  const tabActive = {
    backgroundColor: "white",
    width: "max-content",
    padding: "11px 20px 11px 20px",
    borderRadius: "10px",
    color: "black",
    border: "2px solid #ff7f2a",
    marginRight: "8px",
  };


  const [activeTab, setActiveTab] = useState(true);
  const [actualPage, setActualPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(3);
  const handleView = () => {
    setActiveTab(!activeTab);
  };
  const users = useSelector((state) => state.clientAdminUsers);

  const lastUserIndex = actualPage * usersPerPage;

  const firstUserIndex = lastUserIndex - usersPerPage;

  const usersSlice = users.slice(firstUserIndex, lastUserIndex);


  return (
    <>
      <div className="contieneTodoDashboardUsers">
        <div className="navegateUser">
          <div style={navTab}>
            <div style={activeTab? tabActive: tab} onClick={handleView}>
              All Users
            </div>
            <div style={activeTab? tab: tabActive} onClick={handleView}>
              User Detail
            </div>
          </div>
          <div className="paginationUsers">
        {  activeTab ? <Pagination usersPerPage={usersPerPage} numberOfUsers={users.length} setActualPage={setActualPage}/>:null}
          </div>
        </div>

        <div className="contentDashboardUsers">
          {activeTab ? (
            <>

              <DashBoardUsersConteiner setActiveTab={setActiveTab} activeTab={activeTab} users={usersSlice} setActualPage={setActualPage}/>
              

            </>
          ) : (
            <DashBoardUserDetail />
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoardUser;
