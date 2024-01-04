import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TaskCreation from "../TaskCreation/taskcreation";

const UserContext = React.createContext();

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const userContext = useContext(UserContext);
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  const handleDeleteSelectedTasks = async () => {
    try {
      // Add logic here to delete selected tasks using axios or another method
      // You can use the selectedTasks state to get the IDs of tasks to delete
      console.log("Deleting selected tasks:", selectedTasks);
    } catch (error) {
      console.error("Error deleting tasks:", error);
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
              <Link to="/get-tasks">View Tasks</Link>
            </li>
            <li>
              <Link to="/update-task">Update Tasks</Link>
            </li>
            <li>
              <Link to="/delete-task">Delete Tasks</Link>
            </li>
          </ul>
        </nav>

        {/* Tasks Section */}
        <div className="tasks-section">
          {/* Display Created Tasks */}
          {tasks.length > 0 && (
            <div className="task-list">
              {/* Select All Checkbox */}
              <input
                type="checkbox"
                onChange={() => {
                  // Logic to handle select all tasks
                }}
              />
              {/* Display tasks with checkboxes */}
              {tasks.map((task) => (
                <div key={task.id}>
                  <input
                    type="checkbox"
                    onChange={() => handleTaskSelection(task.id)}
                  />
                  {/* Display task details */}
                  <span>{task.name}</span>
                  {/* Add more task details here */}
                </div>
              ))}
            </div>
          )}

          {/* Update Task Section (modal or component) */}
          {/* You can create a modal or another component for updating tasks */}
          {/* This can be shown when a task is clicked */}
        </div>

        {/* Delete Tasks Section */}
        {selectedTasks.length > 0 && (
          <button onClick={handleDeleteSelectedTasks}>
            Delete Selected Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
