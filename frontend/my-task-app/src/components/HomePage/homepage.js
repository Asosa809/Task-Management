import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TaskCreation from "../TaskCreation/taskcreation";
import GetTask from "../GetTask/GetTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import DeleteTask from "../DeleteTask/DeleteTask";

const UserContext = React.createContext();

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const userContext = useContext(UserContext);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isGetTaskOpen, setIsGetTaskOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const userName = userContext && userContext.user && userContext.user.username;
  const currentDate = new Date().toDateString();

  const toggleMenuBar = () => {
    setIsMenuBarOpen(!isMenuBarOpen);
    setIsCreateTaskOpen(false);
  };

  const toggleCreateTask = (e) => {
    e.preventDefault();
    setIsCreateTaskOpen(!isCreateTaskOpen);
    setIsMenuBarOpen(false);
  };

  const toggleGetTask = (e) => {
    e.preventDefault();
    setIsGetTaskOpen(!isGetTaskOpen); // Assuming you have a state called isGetTaskOpen
    setIsMenuBarOpen(false); // Assuming you want to close the menu bar when toggling the GetTask component
  };

  const toggleUpdateTask = () => {
    setIsUpdateTaskOpen(!isUpdateTaskOpen);
    // Optionally, close other menus/forms when opening UpdateTask
    setIsCreateTaskOpen(false);
    setIsGetTaskOpen(false);
    // Add any other menu toggles as necessary
  };

  const toggleDeleteTask = () => {
    setIsDeleteTaskOpen(!isDeleteTaskOpen);
    // Optionally, close other menus/forms when this one is opened
    setIsCreateTaskOpen(false);
    setIsGetTaskOpen(false);
    setIsUpdateTaskOpen(false);
  };

  const handleTaskCreation = async (taskData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/create-task",
        taskData
      );

      console.log(response.data);
      // Assuming response.data contains the created task
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskSelection = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/citylights.png')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container home-page">
        <header className="main-header">
          <div>
            <h2>{`Welcome, ${userName || "Guest"}!`}</h2>
            <p>{`Today is ${currentDate}`}</p>
          </div>
        </header>
        <nav
          className="menu-bar"
          onMouseEnter={toggleMenuBar}
          onMouseLeave={toggleMenuBar}
        >
          <ul className={isMenuBarOpen ? "menu open" : "menu"}>
            <li>
              <Link to="#" onClick={toggleCreateTask}>
                Create Task
              </Link>
              {isCreateTaskOpen && (
                <TaskCreation handleTaskCreation={handleTaskCreation} />
              )}
            </li>
            <li>
              <Link to="#" onClick={toggleGetTask}>
                Get Task
              </Link>
              {isGetTaskOpen && <GetTask handleGetTask={handleTaskSelection} />}
            </li>
            <li>
              <Link to="#" onClick={toggleUpdateTask}>
                Update Tasks
              </Link>
              {isUpdateTaskOpen && <UpdateTask />}
            </li>
            <li>
              <Link to="#" onClick={toggleDeleteTask}>
                Delete Tasks
              </Link>
              {isDeleteTaskOpen && (
                // Here you can place your DeleteTask component or an inline form
                <DeleteTask />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;
