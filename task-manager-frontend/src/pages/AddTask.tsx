import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/task";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({ title, description, deadline });
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-blue-100 flex flex-col">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition"
          >
            Add Task
          </button>
        </form>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AddTask;
