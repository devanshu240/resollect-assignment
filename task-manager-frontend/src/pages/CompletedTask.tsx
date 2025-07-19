import React, { useEffect, useState } from "react";
import { getCompletedTasks } from "../services/task";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline: string;
}

const CompletedTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getCompletedTasks();
        setTasks(data);
      } catch {
        setError("Failed to fetch completed tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-green-100 flex flex-col">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">Completed Tasks</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600 mb-4">You currently have no completed tasks!</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border rounded bg-green-50">
                <h3 className="font-bold text-lg text-green-700">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-xs text-gray-500">Deadline: {new Date(task.deadline).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CompletedTask; 