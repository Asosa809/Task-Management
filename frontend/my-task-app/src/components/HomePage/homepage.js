import "./homepage.css";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container home-page">
      <header className="main-header">
        <div>
          <h2>Welcome to Your Dashboard</h2>
        </div>
      </header>
      <div className="task-box">
        <Link to="/create-task">Create Task</Link>
        <br />
        <Link to="/get-task">View Tasks</Link>
        <br />
        <Link to="/update-task">Update Tasks</Link>
        <br />
        <Link to="/delete-task">Delete Tasks</Link>
      </div>
    </div>
  );
}

export default HomePage;
