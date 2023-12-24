import React, { useState } from "react";
//import { useAuth } from "./authcontext";
//import { useNavigate } from "react-router-dom";
import axios from "axios";

function TaskCreation() {
  //  const { isAuthenticated } = useAuth();
  //const history = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if user is authenticated before allowing task creation
    // if (!isAuthenticated) {
    //   setError("Please sign in to create a task.");
    //   return;
    // }

    try {
      const taskData = {
        "task-id": taskId, // Update key to 'task-id'
        task_name: taskName,
        task_description: taskDescription,
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/create-task", // Your backend endpoint for task creation
        taskData
      );

      // Handle success
      console.log(response.data); // Log the response data
      setSuccessMessage("Task created successfully!");

      // Optionally, you can redirect the user to another page after successful task creation
      //history.push("/homepage");
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>Create a Task</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskCreation;
